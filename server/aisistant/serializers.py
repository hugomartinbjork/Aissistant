from rest_framework.serializers import ModelSerializer
from .models import User
from rest_framework import serializers


class UserSerializer(ModelSerializer):
    id = serializers.CharField(source='user_id')

    class Meta:
        model = User
        fields = ('id',)
