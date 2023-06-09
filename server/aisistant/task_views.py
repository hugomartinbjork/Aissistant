from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from .models import UserExtended, Task, WorkSpace, Heading, TaskText
from .serializers import TaskSerializer, TaskTextSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from .permissions import IsWorkspaceMember
from rest_framework.exceptions import PermissionDenied


@api_view(["GET", "PUT", "DELETE"])
@permission_classes([IsAuthenticated, IsWorkspaceMember])
def task_detail(request, task_id):
    try:
        task = Task.objects.get(task_id=task_id)
        
        if request.method == "GET":
            serializer = TaskSerializer(task, many=False)
            return Response(serializer.data)

        elif request.method == "PUT":
            data = request.data
            if data.get("order") is not None:
                new_heading = Heading.objects.get(
                    workspace=task.workspace, order=data.get("order")
                )
                task.heading = new_heading
            serializer = TaskSerializer(instance=task, data=data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        elif request.method == "DELETE":
            task.delete()
            return Response("Successful deletion", status=status.HTTP_200_OK)
        
    except PermissionDenied:
        return Response(status=status.HTTP_403_FORBIDDEN)

    except Task.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


class TaskView(APIView):
    permission_classes = [IsAuthenticated,IsWorkspaceMember]
    def get(self, request, ws_id):
        try:
            tasks = Task.objects.filter(workspace_id=ws_id)
            serializer = TaskSerializer(tasks, many=True)
            return Response(serializer.data)
        except PermissionDenied:
            return Response(status=status.HTTP_403_FORBIDDEN)

    """Post"""

    def post(self, request, ws_id):
        ws = WorkSpace.objects.get(id=ws_id)
        title = request.data.get("title")
        todo = request.data.get("todo")
        deadline = request.data.get("deadline")

        new_task = Task(title=title, todo=todo, workspace=ws)
        if deadline is not None:
            new_task.deadline = deadline
        heading = Heading.objects.filter(workspace_id=ws_id).order_by("order").first()
        if heading:
            new_task.heading = heading
        new_task.save()
        serializer = TaskSerializer(new_task)
        if serializer.is_valid:
            return Response(serializer.data, status=200)
        return Response({"Serialization failed"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "POST", "PUT", "DELETE"])
@permission_classes([IsAuthenticated, IsWorkspaceMember])
def task_text(request, task_id):
    try:
        task = Task.objects.get(task_id=task_id)
    except Task.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except PermissionDenied:
        return Response(status=status.HTTP_403_FORBIDDEN)

    if request.method == "GET":
        try:
            task_text = TaskText.objects.get(task_id=task_id)
        except TaskText.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = TaskTextSerializer(task_text)
        return Response(serializer.data)

    elif request.method == "POST":
        data = request.data
        content = data.get("content")
        title = data.get("title")
        if content is not None:
            new_tasktext = TaskText(title=title, task=task, content=content)
            new_tasktext.save()
            serializer = TaskTextSerializer(new_tasktext, many=False)
            return Response(serializer.data)

    elif request.method == "PUT":
        data = request.data
        task_text = TaskText.objects.get(task=task)
        serializer = TaskTextSerializer(instance=task_text, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        task_text = TaskText.objects.get(task=task)
        task_text.delete()
        return Response("Successful deletion", status=status.HTTP_200_OK)





@api_view(["PUT"])
@permission_classes([IsAuthenticated, IsWorkspaceMember])
def assign_user(request, task_id, user_id_list):
    try:
        task = Task.objects.get(task_id=task_id)
    except Task.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except PermissionDenied:
        return Response(status=status.HTTP_403_FORBIDDEN)

    user_ids = user_id_list.split(",")  # Split the user_id_list by comma
    user_ids = [
        int(user_id) for user_id in user_ids
    ]  # Convert the user IDs to integers

    # Iterate through the user IDs and assign them to the task
    task.assigned.clear()
    for user_id in user_ids:
        try:
            user = UserExtended.objects.get(user_id=user_id)
            task.assigned.add(user)
        except UserExtended.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    task.save()
    serializer = TaskSerializer(task)
    return Response(serializer.data)


@api_view(["PUT"])
@permission_classes([IsAuthenticated, IsWorkspaceMember])
def clear_assigned_user(request, task_id):
    try:
        task = Task.objects.get(task_id=task_id)
    except Task.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except PermissionDenied:
        return Response(status=status.HTTP_403_FORBIDDEN)

    if request.method == "PUT":
        task.assigned.clear()  # Clear the assigned relation
        task.save()
        serializer = TaskSerializer(task)
        return Response(serializer.data)

    return Response(status=status.HTTP_400_BAD_REQUEST)
