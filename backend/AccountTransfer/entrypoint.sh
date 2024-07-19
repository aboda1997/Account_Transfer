#!/bin/sh

python manage.py makemigrations
python manage.py migrate 

python manage.py test accounts  

gunicorn AccountTransfer.wsgi:application --bind 0.0.0.0:8000

