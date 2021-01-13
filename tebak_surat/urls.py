from django.contrib import admin
from django.urls import include, path
from .views import tebakSurat

urlpatterns = [
    path('', tebakSurat, name="tebakSurat")
]