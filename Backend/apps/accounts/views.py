from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token

"""
Archivo: views.py
Propósito: Manejar las peticiones HTTP de la API y coordinar la lógica de negocio.

Responsabilidades:
- Recibir la petición del cliente (POST, GET, PUT, DELETE)
- Llamar a los serializers para validar los datos
- Ejecutar la lógica de negocio principal (por ejemplo, autenticación, creación de objetos, consultas)
- Devolver respuestas HTTP adecuadas con datos o errores en formato JSON
- Manejar permisos y autenticación (con decoradores o clases de DRF)

Lo que NO se debe hacer en este archivo:
- Definir la estructura de la base de datos (eso va en models.py)
- Validar el formato de datos detalladamente (eso va en serializers.py)
- Guardar datos directamente sin pasar por un serializer (es mejor mantener consistencia y validación)
"""

# class SignIn(APIView):
#     def post(self, request):
#         serializer = SignInSerializer(data=request.data)
#         if serializer.is_valid():
#             user = serializer.validated_data['user']
#             token, created = Token.objects.get_or_create(user=user)
#             return Response({
#                 "message": "Login exitoso",
#                 "token": token.key,
#                 "user": {
#                     "email": user.email,
#                     "role": user.role,
#                 }
#             })
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)






from apps.accounts.serializers import PruebaSerializer


class Prueba(APIView):
    def post(self, request):
        serializer = PruebaSerializer(data=request.data)
        if serializer.is_valid():
            name = serializer.validated_data['name']
            return Response({"message": f"Hola, {name}!"})
        return Response(serializer.errors, status=400)
        
    




