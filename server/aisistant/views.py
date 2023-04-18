from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from .models import User
from .serializers import UserSerializer

# Create your views here.

@api_view(["GET"])
def default(request):
    return Response("default")

class Users(APIView):
    def get(self, request):
        try: 
            users = User.objects.all()
        except: 
            return Response("Error")
        serialized = UserSerializer(users, many=True)
        return Response(serialized.data)

    def post(self, request):
        try:
            data = request.data
        except:
            return Response("Error")
        new = User.objects.create(
            name=data["name"], date_of_birth=data["date_of_birth"]
        )
        User.save(new)
        return Response("You added a user")
