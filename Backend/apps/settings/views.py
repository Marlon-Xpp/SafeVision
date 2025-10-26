from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from apps.accounts.models import User
from .serializers import CreateUserSerializer

class CreateUserView(APIView):
    permission_classes = [IsAuthenticated]  # Solo usuarios autenticados pueden acceder

    def post(self, request):
        # Verificar si el usuario es administrador
        if request.user.role != "admin":
            return Response(
                {"success": False, "message": "No tienes permiso para registrar usuarios."},
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = CreateUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "success": True, 
                "message": "Usuario creado correctamente."
            }, status=status.HTTP_201_CREATED)

        return Response({
            "success": False, 
            "message": "Error al registrar trabajador.",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
