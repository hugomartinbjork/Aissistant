from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from .models import UserExtended, Task, WorkSpace, Heading
from .serializers import UserSerializer, TaskSerializer, WorkSpaceSerializer
from django.contrib.auth import authenticate, login
from rest_framework.exceptions import AuthenticationFailed
from knox.models import AuthToken
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.core.management.base import BaseCommand

# Create your views here.

class WorkSpaceView(APIView):
    '''Group.'''

    def get(self, request, user_id):
        '''Get.'''
        if request.method == 'GET':
            ws = WorkSpace.objects.filter(users = user_id)
            serializer = WorkSpaceSerializer(ws, many = True)
            return Response(serializer.data)
        '''Post'''
    def post(self, request, user_id):
        if request.method == 'POST':
            name = request.data.get('name')
            creator = UserExtended.objects.get(user_id=user_id)
            new_ws = WorkSpace(name=name)
            new_ws.save()
            new_ws.users.add(creator)
            if new_ws is None:
                return Response('WorkSpace could not be created', status=status.HTTP_400_BAD_REQUEST)
            new_ws.save()
            heading_1=Heading(text="Planned", workspace= new_ws, order=0)
            heading_2=Heading(text="Doing", workspace= new_ws, order=1)
            heading_3=Heading(text="Done", workspace= new_ws, order=2)
            heading_1.save()
            heading_2.save()
            heading_3.save()
            serializer = WorkSpaceSerializer(new_ws)
            if serializer.is_valid:
                return Response(serializer.data, status=200)
            return Response({'Serialization failed'}, status=status.HTTP_400_BAD_REQUEST)
        
@api_view(['GET', 'PUT', 'DELETE'])
def ws_detail(request, ws_id):
    '''workspace/<int:ws_id>'''
    try:
        ws = WorkSpace.objects.get(id=ws_id)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    '''Get'''
    if request.method == 'GET':
        serializer = WorkSpaceSerializer(ws, many= False)
        return Response(serializer.data)

    elif request.method == 'PUT':
        name = request.data.get('name')
        ws.name = name
        ws.save()
        serializer = WorkSpaceSerializer(ws, many= False)
        return Response(serializer.data)
    elif request.method == 'DELETE':
        ws.delete()
        return Response('Sucessful deletion', status=200)
    
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def ws_headings(request, ws_id):

    try:
        ws = WorkSpace.objects.get(id=ws_id)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    '''Get'''
    if request.method == 'GET':
        serializer = WorkSpaceSerializer(ws, many= True)
        return Response(serializer.data)
        '''Get'''
    elif request.method == 'POST':
        serializer = WorkSpaceSerializer(ws, many= True)
        return Response(serializer.data)

    elif request.method == 'PUT':
        name = request.data.get('name')
        ws.name = name
        ws.save()
        serializer = WorkSpaceSerializer(ws, many= False)
        return Response(serializer.data)
    elif request.method == 'DELETE':
        ws.delete()
        return Response('Sucessful deletion', status=200)

