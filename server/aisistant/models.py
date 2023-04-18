from django.db import models

# Create your models here.

class User(models.Model):
    first_name = models.TextField(null=False, max_length=30)
    last_name = models.TextField(null=False, max_length=30)
    email = models.EmailField(null=False, max_length=40)

    def __str__(self):
        return self.first_name
