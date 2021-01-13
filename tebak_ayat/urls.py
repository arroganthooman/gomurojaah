from django.contrib import admin
from django.urls import include, path
from .views import tebakAyat

urlpatterns = [
    path('', tebakAyat, name="tebakAyat")
]
