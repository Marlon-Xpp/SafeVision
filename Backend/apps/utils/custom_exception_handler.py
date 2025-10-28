from rest_framework.views import exception_handler
from rest_framework.exceptions import AuthenticationFailed, NotAuthenticated, PermissionDenied
from jwt import ExpiredSignatureError, InvalidTokenError

def custom_exception_handler(exc, context):
    # Llama al manejador por defecto de DRF para obtener la respuesta inicial
    response = exception_handler(exc, context)

    # Estructura base
    custom_response = {
        "success": False,
        "message": "Ocurrió un error inesperado.",
        "errors": None
    }

    # --- ⚙️ Tipos específicos de errores ---
    if isinstance(exc, NotAuthenticated):
        custom_response["message"] = "Credenciales de autenticación no proporcionadas o inválidas."
    elif isinstance(exc, AuthenticationFailed):
        custom_response["message"] = "Error de autenticación. El token no es válido o ha expirado."
    elif isinstance(exc, PermissionDenied):
        custom_response["message"] = "No tienes permiso para realizar esta acción."
    elif isinstance(exc, ExpiredSignatureError):
        custom_response["message"] = "El token ha expirado. Por favor, inicia sesión nuevamente."
    elif isinstance(exc, InvalidTokenError):
        custom_response["message"] = "El token proporcionado no es válido."
    else:
        # Si DRF ya devolvió una respuesta con 'detail', la usamos
        if response is not None and "detail" in response.data:
            custom_response["message"] = str(response.data["detail"])
        elif response is not None:
            custom_response["errors"] = response.data

    # Asigna el nuevo formato si había respuesta
    if response is not None:
        response.data = custom_response

    return response
