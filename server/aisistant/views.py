from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate, login
from rest_framework.views import APIView
from .models import User
from .serializers import UserSerializer
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# Create your views here.


@api_view(["GET"])
def getRoutes(request):
    routes = [
        '/aisistant/token',
        '/aisistant/token/refresh'
    ]
    return Response(routes)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


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


class Login(APIView):
    '''Login a user using credentials username and password and returns
    the user along with bearer auth token'''

    def post(self, request):
        '''Login a user using credentials username and password. 
        returns User along with auth token'''
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            raise AuthenticationFailed

        auth = authenticate(username=username, password=password)
        if auth is None:
            raise AuthenticationFailed

        login(request, auth)

        user = self.user_service.get_user_info(request.user)
        serialized_user = UserInfoSerializer(user)
        data = {
            "user": serialized_user.data,
            "token": AuthToken.objects.create(auth)[1]
        }
        return JsonResponse(data, status=status.HTTP_200_OK)
