from django.urls import path
from . import views

urlpatterns = [
    path('', views.content_home, name='content_home'),
    # add more paths for videos, notes, assignments, etc.
]