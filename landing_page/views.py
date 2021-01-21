from django.shortcuts import render
from django.http import JsonResponse
import requests

# Create your views here.


def landing_page(request):
	return render(request, 'landing.html')


def listSurah(request):
	response = requests.get("https://api.quran.sutanlab.id/surah").json()
	return JsonResponse(response)
