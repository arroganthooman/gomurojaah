from django.shortcuts import render

# Create your views here.

def tebakAyat(request):
	return render(request, 'tebak_ayat.html')