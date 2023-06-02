from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from .models import UserExtended, WorkSpace, Heading
from .serializers import WorkSpaceSerializer
from rest_framework.permissions import IsAuthenticated
from .permissions import UserIsAuth, IsWorkspaceMember
from rest_framework.decorators import permission_classes
from rest_framework.exceptions import PermissionDenied

# Create your views here.

class WorkSpaceView(APIView):
    '''Group.'''
    permission_classes = [IsAuthenticated, UserIsAuth]
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
    ## Leave WS
    def put(self, request, user_id):
        ws = WorkSpace.objects.get(users = user_id)
        print(ws, user_id)
        user= UserExtended.objects.get(user=user_id) 
        data = request.data
        if ws:
            if user in ws.users.all():
                ws.users.remove(user)
                if ws.users.count() == 0:
                    ws.delete()
                    return Response('Workspace deleted', status=status.HTTP_200_OK)
        serializer = WorkSpaceSerializer(instance=ws, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated,UserIsAuth])
def ws_leave(request, ws_id, user_id):
    '''workspaces/<int:ws_id>'''
    try:
        ws = WorkSpace.objects.get(id=ws_id)
    except WorkSpace.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except PermissionDenied:
        return Response(status=status.HTTP_403_FORBIDDEN)
    
 ## Leave WS
    if request.method == 'PUT':
        user= UserExtended.objects.get(user=user_id) 
        data = request.data
        if ws:
            if user in ws.users.all():
                ws.users.remove(user)
                if ws.users.count() == 0:
                    ws.delete()
                    return Response('Workspace deleted', status=status.HTTP_200_OK)
        serializer = WorkSpaceSerializer(instance=ws, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated,IsWorkspaceMember ])
def ws_detail(request, ws_id):
    '''workspace/<int:ws_id>'''
    try:
        ws = WorkSpace.objects.get(id=ws_id)
    except WorkSpace.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except PermissionDenied:
        return Response(status=status.HTTP_403_FORBIDDEN)
    '''Get'''
    if request.method == 'GET':
        serializer = WorkSpaceSerializer(ws, many= False)
        return Response(serializer.data)
    # Change ws / add user to ws
    elif request.method == 'PUT':
        data = request.data
        if data.get('user_id') is not None:
            user_id = data.get('user_id')
            try:
                user = UserExtended.objects.get(user=user_id)
            except UserExtended.DoesNotExist:
                return Response("User not found", status=status.HTTP_404_NOT_FOUND)
            if user not in ws.users.all():
                ws.users.add(user)
            serializer = WorkSpaceSerializer(instance=ws, data=data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response("Invalid request data", status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        ws.delete()
        return Response('Sucessful deletion', status=200)
    
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated, IsWorkspaceMember])
def ws_headings(request, ws_id):
    try:
        ws = WorkSpace.objects.get(id=ws_id)
    except WorkSpace.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except PermissionDenied:
        return Response(status=status.HTTP_403_FORBIDDEN)
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

