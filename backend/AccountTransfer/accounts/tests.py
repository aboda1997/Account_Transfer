from django.test import Client, TestCase
from django.urls import reverse
from .models import Account

class ImportTestCase(TestCase):
    def setUp(self):
        self.client = Client()

    def test_import_csv_success(self):
        with open('test_data.csv', 'w') as f:
            f.write('id,name,balance\n')
            f.write('value1,abdelrahman,2023.1\n')
            f.write('value2,ahmed,200.3\n')

        with open('test_data.csv', 'rb') as f:
            response = self.client.post(reverse('import_data'), {'file': f})

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {'message': 'Data imported successfully'})

        self.assertEqual(Account.objects.count(), 2)
        self.assertEqual(Account.objects.first().id, 'value1')
        self.assertEqual(Account.objects.first().name, 'abdelrahman')
        self.assertEqual(Account.objects.first().balance  , 2023.1 )
    def test_import_invalid_file(self):
        with open('test_data.txt', 'w') as f:
            f.write('This is not a CSV file')

        with open('test_data.txt', 'rb') as f:
            response = self.client.post(reverse('import_data'), {'file': f})

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {'error': 'Unsupported file type'})

        self.assertEqual(Account.objects.count(), 0)


class TransferFundsTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.account1 = Account.objects.create(id='account1', name = 'account2' ,  balance=1000)
        self.account2 = Account.objects.create(id='account2', name="account1",  balance=500)

    def test_successful_transfer(self):
        data = {
            'fromAccountId': 'account1',
            'toAccountId': 'account2',
            'amount': 200
        }
        response = self.client.post(reverse('account_transfer'), data=data, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {'success': True, 'message': 'Transfer successful.'})

        self.account1.refresh_from_db()
        self.account2.refresh_from_db()
        self.assertEqual(self.account1.balance, 800)
        self.assertEqual(self.account2.balance, 700)

    def test_insufficient_balance(self):
        data = {
            'fromAccountId': 'account1',
            'toAccountId': 'account2',
            'amount': 2000
        }
        response = self.client.post(reverse('account_transfer'), data=data, content_type='application/json')
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {'success': False, 'message': 'Insufficient balance in the from account.'})

        self.account1.refresh_from_db()
        self.account2.refresh_from_db()
        self.assertEqual(self.account1.balance, 1000)
        self.assertEqual(self.account2.balance, 500)

    def test_account_not_found(self):
        data = {
            'fromAccountId': 'non_existent_account',
            'toAccountId': 'account2',
            'amount': 200
        }
        response = self.client.post(reverse('account_transfer'), data=data, content_type='application/json')
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json(), {'success': False, 'message': 'One or both accounts do not exist.'})

        self.account1.refresh_from_db()
        self.account2.refresh_from_db()
        self.assertEqual(self.account1.balance, 1000)
        self.assertEqual(self.account2.balance, 500)