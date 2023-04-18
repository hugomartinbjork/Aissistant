from rest_framework.serializers import ModelSerializer
from .models import User
from rest_framework.views import APIView


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"

class Users(APIView):
    def get(self, request):
        users = User.objects.all()
        serialized = UserSerializer(users, many=True)
        return Response(serialized.data)

    def post(self, request):
        data = request.data
        new = User.objects.create(
            name=data["name"], date_of_birth=data["date_of_birth"]
        )
        User.save(new)
        return Response("You added a user")
