from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from .models import UserExtended, Task
from .serializers import UserSerializer, TaskSerializer
from django.contrib.auth import authenticate, login
from rest_framework.exceptions import AuthenticationFailed
from knox.models import AuthToken
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.core.management.base import BaseCommand

# Create your views here.


@api_view(["GET"])
def default(request):
    return Response("default")


class Login(APIView):

    def post(self, request):
        '''Login a user using credentials username and password. 
        returns User along with auth token'''
        email = request.data.get('email')
        password = request.data.get('password')
        if not email or not password:
            raise AuthenticationFailed
        auth = authenticate(username=email, password=password)
        print(auth)
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
            "token": AuthToken.objects.create(auth)[1]
        }
        return Response(data, status=status.HTTP_200_OK)


class Users(APIView):
    def get(self, request):
        try:
            users = UserExtended.objects.all()
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        serialized = UserSerializer(users, many=True)
        return Response(serialized.data)

    def post(self, request):
        try:
            data = request.data
        except:
            return Response("Error")
        password = make_password(data['password'])
        tmp = User.objects.create(
            username=data['email'], password=password)
        new = UserExtended.objects.create(
            user=tmp,
        )
        UserExtended.save(new)
        return Response("A new user has been added to the system", status=status.HTTP_200_OK)
    
@api_view(['GET', 'PUT', 'DELETE'])
def task_detail(request, id):

    try:
        task = Task.objects.get(id=id)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    '''Get'''
    if request.method == 'GET':
        task = Task.objects.get(id=id)
        serializer = TaskSerializer(task, many= True)
        return Response(serializer.data)

    elif request.method == 'PUT':
        body = request.data.get('body')
        task.body = body
        task.save()
        serializer = TaskSerializer(task, many= False)
        return Response(serializer.data)
    elif request.method == 'DELETE':
        task.delete()
        return Response('Sucessful deletion', status=200)
    
class TaskView(APIView):
    '''Group.'''

    def get(self, request):
        '''Get.'''
        if request.method == 'GET':
            tasks = Task.objects.all()
            serializer = TaskSerializer(tasks, many = True)
            return Response(serializer.data)
        '''Post'''
    def post(self, request):
        if request.method == 'POST':
            body = request.data.get('body')
            new_task=Task(body=body)
            if new_task is None:
                return Response('Task could not be created', status=status.HTTP_400_BAD_REQUEST)
            new_task.save()
            serializer = TaskSerializer(new_task)
            if serializer.is_valid:
                return Response(serializer.data, status=200)
            return Response({'Serialization failed'}, status=status.HTTP_400_BAD_REQUEST)

    





class Command(BaseCommand):
    help = 'Reset daily count for all users'

    def handle(self, *args, **options):

        users = UserExtended.objects.all()

        for user in users:
            user.daily_count = 0
            user.save()
