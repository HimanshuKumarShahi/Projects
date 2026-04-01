from django.urls import path
from . import views

urlpatterns = [
    path('', views.courses_home, name='courses_home'),
    # add more paths here for course list, detail, upload, etc.
]