import csv
import openpyxl
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Account
import json 
@csrf_exempt
def import_data(request):
    if request.method == 'POST':
        try:
            uploaded_file = request.FILES['file']
            file_extension = uploaded_file.name.split('.')[-1].lower()

            if file_extension == 'csv':
                data = list() 
                for row in list(uploaded_file)[1:] : 
                    row = row.decode('utf-8')
                    values = row.strip().split(',')
                    data.append(values)
                uploaded_file = data    
            elif file_extension in ['xlsx', 'xls']:
                workbook = openpyxl.load_workbook(uploaded_file)
                worksheet = workbook.active
                uploaded_file = worksheet.iter_rows(min_row=2, values_only=True)
                next(uploaded_file)    

            else:
                return JsonResponse({'error': 'Unsupported file type'}, status=400)
            for row in uploaded_file:
                instance = Account(
                    id=row[0],
                    name=row[1],
                    balance=row[2]
                )
                instance.save()

            return JsonResponse({'message': 'Data imported successfully'}, status= 200 )
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)




def get_data(request):
    accounts = Account.objects.all()
    return JsonResponse({'accounts': list(accounts.values())}, status= 200)

@csrf_exempt
def account_transfer(request):
    data = json.loads(request.body.decode('utf-8')) 
    from_account_id = data.get('fromAccountId').strip()
    to_account_id = data.get('toAccountId').strip()
    amount = float(data.get('amount'))

    if request.method == 'POST':

        try:
            from_account = Account.objects.get(id=str(from_account_id))
            to_account = Account.objects.get(id=to_account_id)
          

            if from_account.balance < amount:
                return JsonResponse({'success': False, 'message': 'Insufficient balance in the from account.'}, status=400)

            from_account.balance -= amount
            to_account.balance += amount
            from_account.save()
            to_account.save()

            return JsonResponse({'success': True, 'message': 'Transfer successful.'}, status= 200)
        except Account.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'One or both accounts do not exist.'}, status= 404)
        except Exception as e:
            return JsonResponse({'success': False, 'message': str(e)}, status= 500)    
    else:
         return JsonResponse({'success': False, 'message': 'Only POST requests are allowed'}, status=405)
