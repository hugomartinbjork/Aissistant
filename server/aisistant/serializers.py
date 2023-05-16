from rest_framework.serializers import ModelSerializer
from .models import User, Task
from rest_framework import serializers


class UserSerializer(ModelSerializer):
    id = serializers.CharField(source='user_id')
    tasks = serializers.SlugRelatedField(
        read_only=True, many=True, slug_field='id', source='tasks'
    )
    class Meta:
        model = User
        fields = ('id',)

class TaskSerializer(ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'

