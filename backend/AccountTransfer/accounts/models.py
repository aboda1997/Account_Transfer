from django.db import models

class Account(models.Model):
    id = models.CharField(primary_key=True,  editable=False, max_length=36)
    name = models.CharField(max_length=100)
    balance = models.FloatField(default=0.0)
    