from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from .models import UserExtended, WorkSpace
from .serializers import UserExtendedSerializer, UserSerializer
from django.contrib.auth import authenticate, login
from rest_framework.exceptions import AuthenticationFailed
from knox.models import AuthToken
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from .permissions import IsWorkspaceMember, UserIsAuth
from rest_framework.exceptions import PermissionDenied
# Create your views here.
class Login(APIView):
    def post(self, request):
        """Login a user using credentials username and password.
        returns User along with auth token"""
        email = request.data.get("email")
        password = request.data.get("password")
        if not email or not password:
            raise AuthenticationFailed
        auth = authenticate(username=email, password=password)
        if auth is None:
            raise AuthenticationFailed
        login(request, auth)
        try:
            user = UserExtended.objects.filter(user=request.user).first()
        except Exception:
            raise AuthenticationFailed
        serialized_user = UserSerializer(user)
        data = {
            "user": serialized_user.data,
            "token": AuthToken.objects.create(auth)[1],
        }
        return Response(data, status=status.HTTP_200_OK)


class Users(APIView):
    def get(self, request):
        try:
            users = UserExtended.objects.all()
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        serialized = UserExtendedSerializer(users, many=True)
        return Response(serialized.data)

    def post(self, request):
        try:
            data = request.data
        except:
            return Response("Error")
        password = make_password(data["password"])
        tmp = User.objects.create(username=data["email"], password=password)
        new = UserExtended.objects.create(
            user=tmp,
        )
        UserExtended.save(new)
        return Response(
            "A new user has been added to the system", status=status.HTTP_200_OK
        )


@api_view(["GET", "PUT", "DELETE"])
@permission_classes([IsAuthenticated, IsWorkspaceMember])
def user_detail_by_ws(request, ws_id):
    try:
        ws = WorkSpace.objects.get(id=ws_id)
    except UserExtended.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except PermissionDenied:
        return Response(status=status.HTTP_403_FORBIDDEN)
    if request.method == "GET":
        serializer = UserExtendedSerializer(ws.users.all(), many=True)
        return Response(serializer.data)

@permission_classes([IsAuthenticated,UserIsAuth])
@api_view(["GET"])
def single_user(request, user_id):
    try:
        user = UserExtended.objects.get(user_id=user_id)
    except UserExtended.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except PermissionDenied:
        return Response(status=status.HTTP_403_FORBIDDEN)
        
    if request.method == "GET":
        serializer = UserExtendedSerializer(user, many=False)
        return Response(serializer.data)
