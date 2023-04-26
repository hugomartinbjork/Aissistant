from django.urls import path, include
from . import views
from knox.models import AuthToken
from rest_framework_simplejwt import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path("", views.getRoutes),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh')
]
