from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import CreateWorkerSerializer
from rest_framework.permissions import AllowAny

class CreateWorkerView(APIView):
    """
    Vista para registrar un nuevo trabajador.
    """
    permission_classes = [AllowAny]  # 🔓 acceso libre 
    
    def post(self, request):
        serializer = CreateWorkerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Trabajador registrado exitosamente.",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response({
            "message": "Error al registrar trabajador.",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
