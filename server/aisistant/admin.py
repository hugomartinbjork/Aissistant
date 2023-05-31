from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(UserExtended)
admin.site.register(Task)
admin.site.register(WorkSpace)
admin.site.register(Heading)
admin.site.register(TaskText)
