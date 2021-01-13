from django.shortcuts import render

# Create your views here.

def tebakSurat(request):
	return render(request, 'tebak_surat.html')