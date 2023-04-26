from django.urls import path
from . import views

urlpatterns = [
    path("", views.default, name="default"),
    path('login', views.Login.as_view()),
]
