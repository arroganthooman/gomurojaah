from django.shortcuts import render

# Create your views here.

def sambungAyat(request):
	return render(request, "sambung_ayat.html")