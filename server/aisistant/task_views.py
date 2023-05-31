from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from .models import UserExtended, Task, WorkSpace, Heading, TaskText
from .serializers import UserSerializer, TaskSerializer, TaskTextSerializer
from django.contrib.auth import authenticate, login
from rest_framework.exceptions import AuthenticationFailed
from knox.models import AuthToken
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password


@api_view(["GET", "PUT", "DELETE"])
def task_detail(request, task_id):
    try:
        task = Task.objects.get(task_id=task_id)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)

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


class TaskView(APIView):
    def get(self, request, ws_id):
        tasks = Task.objects.filter(workspace_id=ws_id)
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

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


@api_view(["GET"])
def get_all_tasks(request):
    if request.method == "GET":
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)


@api_view(["GET", "POST", "PUT", "DELETE"])
def task_text(request, task_id):
    try:
        task = Task.objects.get(task_id=task_id)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        try:
            task_text = TaskText.objects.get(task=task)
        except TaskText.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = TaskTextSerializer(task_text)
        return Response(serializer.data)

    elif request.method == "POST":
        data = request.data
        content = data.get("content")
        if content is not None:
            new_tasktext = TaskText(title=task.title, task=task, content=content)
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
