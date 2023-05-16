from django.db import models
from django.contrib.auth.models import User

class UserExtended(models.Model):
    daily_count = models.IntegerField(null=False, default=0)
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)

class WorkSpace(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.TextField(null=True)
    users = models.ManyToManyField(UserExtended, related_name='workspaces')

class Heading(models.Model):
    order = models.IntegerField(null=True, default=0)
    text = models.CharField(max_length=255)
    workspace = models.ForeignKey(WorkSpace, on_delete=models.CASCADE, related_name='headings')

class Task(models.Model):
    id = models.AutoField(primary_key=True)
    assigned = models.ForeignKey(UserExtended, null=True, blank=True, on_delete=models.CASCADE)
    workspace = models.ForeignKey(WorkSpace, null=True, blank=True, on_delete=models.CASCADE)
    title = models.TextField(null=True)
    todo = models.TextField(null=True)
    deadline = models.DateTimeField(null=True, blank=True)
    heading = models.ForeignKey(Heading, null=True, blank=True, on_delete=models.CASCADE)