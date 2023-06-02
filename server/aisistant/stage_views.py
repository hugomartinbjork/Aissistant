from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from .models import WorkSpace, Heading
from .serializers import HeadingsSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from .permissions import IsWorkspaceMember
from rest_framework.exceptions import PermissionDenied

class HeadingView(APIView):
    permission_classes = [IsAuthenticated, IsWorkspaceMember]
    def get(self, request, ws_id):
        headings = Heading.objects.filter(workspace_id=ws_id)
        serializer = HeadingsSerializer(headings, many=True)
        return Response(serializer.data)

    """Post"""

    def post(self, request, ws_id):
        ws = WorkSpace.objects.get(id=ws_id)
        text = request.data.get("text")
        order = request.data.get("order")
        headings = ws.headings.all()
        print("here is heading", headings)
        headings_to_increment = headings.filter(order__gte=order)
        for heading in headings_to_increment:
            heading.order += 1
            heading.save()
        new_heading = Heading(text=text, order=order, workspace=ws)
        new_heading.save()
        serializer = HeadingsSerializer(new_heading)
        if serializer.is_valid:
            return Response(serializer.data, status=200)
        return Response({"Serialization failed"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT", "DELETE"])
@permission_classes([IsAuthenticated, IsWorkspaceMember])
def heading_detail(request, ws_id, order):
    try:
        heading = Heading.objects.get(workspace_id=ws_id, order=order)
    except Heading.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except PermissionDenied:
        return Response(status=status.HTTP_403_FORBIDDEN)

    if request.method == "GET":
        serializer = HeadingsSerializer(heading)
        return Response(serializer.data)

    elif request.method == "PUT":
        data = request.data
        serializer = HeadingsSerializer(instance=heading, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        headings_to_update = Heading.objects.filter(workspace_id=ws_id, order__gt=order)
        for heading in headings_to_update:
            heading.order -= 1
            heading.save()
        heading.delete()
        return Response("Successful deletion", status=status.HTTP_200_OK)
