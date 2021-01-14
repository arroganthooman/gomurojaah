from django.contrib import admin
from django.urls import include, path
from .views import sambungAyat

urlpatterns = [
    path('', sambungAyat, name="sambungAyat")
]