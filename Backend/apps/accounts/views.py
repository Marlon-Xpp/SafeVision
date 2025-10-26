from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import SignInSerializer, UserSerializer

class SignInView(APIView):
    permission_classes = []  # Público (no requiere token para iniciar sesión)

    def post(self, request):
        serializer = SignInSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]

        refresh = RefreshToken.for_user(user)
        user_data = UserSerializer(user).data

        return Response({
            "success": True,
            "message": "Inicio de sesión exitoso",
            "user": user_data,
            "access": str(refresh.access_token),
            "refresh": str(refresh),
        }, status=status.HTTP_200_OK)


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_user(request):
#     serializer = UserSerializer(request.user)
#     return Response(serializer.data)