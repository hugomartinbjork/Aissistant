from django.urls import path
from . import views

urlpatterns = [
    path("", views.default, name="default"),
    path('login', views.Login.as_view()),
    # User
    path('users', views.Users.as_view()),

## Reset users daily counts
    path('reset', views.Command),
]
