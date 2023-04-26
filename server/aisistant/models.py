from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class UserExtended(models.Model):
    documents = models.TextField(null=True)
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True)
