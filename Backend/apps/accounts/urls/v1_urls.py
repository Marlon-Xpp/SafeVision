from django.urls import path
from apps.accounts.views import Prueba

urlpatterns = [
    # path("signin/", SignIn.as_view(), name="signin"),
    # path("signup/", SignUpView.as_view(), name="signup"),
    
    path("prueba/", Prueba.as_view(), name="prueba")
    
    
    
]

"""
Explicación:
- URL: /admin/login/ será la ruta que el front-end llamará para loguearse.
- AdminLoginView: será la vista que procesará la petición POST con email y contraseña.
- name='admin-login': un identificador para usar con reverse() si lo necesitas.
- Flujo: la petición llega a esta URL y luego pasa a la vista (views.py)
"""

