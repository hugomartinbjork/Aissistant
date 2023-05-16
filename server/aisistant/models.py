from django.db import models
from django.contrib.auth.models import User

class UserExtended(models.Model):
    daily_count = models.IntegerField(null=False, default=0)
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True)

class Task(models.Model):
    id = models.AutoField(primary_key=True)
    owner = models.ForeignKey(UserExtended, null=True, on_delete=models.SET_NULL, related_name='owned_tasks')
    users = models.ManyToManyField(UserExtended, related_name='assigned_tasks')
    todo = models.TextField(null=False)
    stage = models.IntegerField(null=False, default=1)
