from django.contrib import admin
from .models import UserExtended, Task

# Register your models here.
admin.site.register(UserExtended)
admin.site.register(Task)
