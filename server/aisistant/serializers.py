from rest_framework.serializers import ModelSerializer
from .models import *
from rest_framework import serializers


class UserSerializer(ModelSerializer):
    id = serializers.CharField(source="user_id")

    class Meta:
        model = User
        fields = ("id",)


class HeadingsSerializer(ModelSerializer):
    class Meta:
        model = Heading
        fields = "__all__"


class TaskSerializer(ModelSerializer):
    heading = HeadingsSerializer(many=False, read_only=True)

    class Meta:
        model = Task
        fields = "__all__"


class WorkSpaceSerializer(ModelSerializer):
    headings = HeadingsSerializer(many=True, read_only=True)

    class Meta:
        model = WorkSpace
        fields = "__all__"
