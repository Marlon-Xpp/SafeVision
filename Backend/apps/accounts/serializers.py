from rest_framework import serializers
from django.contrib.auth import authenticate

"""
Archivo: serializers.py
Propósito: Definir cómo se transforman y validan los datos que entran y salen de la API.

Responsabilidades:
- Validar datos que vienen de la API (formato de email, longitud de contraseña, campos obligatorios, reglas de negocio)
- Serializar modelos a JSON para enviarlos al cliente
- Deserializar datos JSON del cliente y convertirlos en objetos de Python o modelos
- Validar permisos simples (por ejemplo, solo administradores pueden hacer login aquí)
- Preparar datos antes de guardarlos en la base de datos

Lo que NO se debe hacer en este archivo:
- Crear vistas o manejar peticiones HTTP
- Hacer lógica compleja que involucre varios modelos o procesos largos (eso va en views.py o servicios)
- Modificar la estructura de la base de datos (eso va en models.py)
"""

# class SignInSerializer(serializers.Serializer):
#     email = serializers.EmailField(
#         allow_blank=False,
#         error_messages={
#             "blank": "El correo no puede estar vacío",
#             "invalid": "Introduce un correo válido",
#         }
#     )
    
#     password = serializers.CharField(
#         write_only=True,
#         allow_blank=False,
#         error_messages={"blank": "La contraseña no puede estar vacía"}
#     )
    
#     def validate(self, data):
#         email = data.get("email")
#         password = data.get("password")
        
#         user = authenticate(username=email, password=password)
#         if not user:
#             raise serializers.ValidationError("Correo o contraseña incorrectos")
        
#         # Guardar el usuario validado
#         data['user'] = user
#         return data
    

from .models import Person


class PruebaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ['name']
    






