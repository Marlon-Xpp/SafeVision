from django.urls import path
from .views import SignInView, SignUpUserView

urlpatterns = [
    path('signin/', SignInView.as_view(), name='signin'),
    path('signup/', SignUpUserView.as_view(), name='signup'),
]