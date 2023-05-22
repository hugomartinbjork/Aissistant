from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from .models import WorkSpace, Heading
from .serializers import HeadingsSerializer

class HeadingView(APIView):
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
        print('here is heading', headings)
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