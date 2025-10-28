from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed, NotAuthenticated
from apps.accounts.models import User
from rest_framework.parsers import JSONParser, FormParser, MultiPartParser
from .serializers import CreateUserSerializer
from jwt import ExpiredSignatureError, InvalidTokenError

class CreateUserView(APIView):
    permission_classes = [IsAuthenticated]
    # parser_classes = [JSONParser, FormParser, MultiPartParser]

    def post(self, request):
        if request.user.role != "admin":
            return Response({
                "success": False,
                "message": "No tienes permiso para registrar usuarios.",
                "errors": None
            }, status=status.HTTP_403_FORBIDDEN)

        serializer = CreateUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "success": True,
                "message": "Usuario creado correctamente.",
                "errors": None
            }, status=status.HTTP_201_CREATED)

        return Response({
            "success": False,
            "message": "Error al registrar usuario.",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
