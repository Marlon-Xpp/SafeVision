from django.urls import path
from .views import SignInView

urlpatterns = [
    path('signin/', SignInView.as_view(), name='signin'),
    # path('signup/', SignUpUserView.as_view(), name='signup'),
    # path('get/user/', get_user, name='getuser'),
    
]



# POST /api/users/create/              → registrar nuevo usuario
# POST /api/workers/create/            → registrar nuevo trabajador
# POST /api/cameras/register/          → registrar cámara
