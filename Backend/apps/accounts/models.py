from django.db import models
from django.contrib.auth.models import AbstractUser

"""
Archivo: models.py
Propósito: Definir la estructura de los modelos de datos que se almacenarán en la base de datos.

Responsabilidades:
- Definir los campos de cada modelo (tipo de dato, longitud, si es único, si puede ser nulo, valores por defecto, etc.)
- Crear relaciones entre modelos (ForeignKey, ManyToManyField, OneToOneField)
- Añadir validaciones simples de base de datos usando `validators` si se desea
- Opcional: métodos que pertenezcan al modelo, como funciones que manipulen o devuelvan datos del propio objeto

Lo que NO se debe hacer en este archivo:
- Validación compleja de datos de entrada de la API (eso va en serializers.py)
- Lógica de negocio que involucre múltiples modelos o interacción con la API (eso va en views.py)
- Manejo de peticiones HTTP o respuestas al cliente
"""


class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Administrador'),
        ('supervisor', 'Supervisor'),
    )

    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='supervisor')
    phone = models.CharField(max_length=15, blank=True, null=True)

    def __str__(self):
        return f"{self.username} ({self.role})"
