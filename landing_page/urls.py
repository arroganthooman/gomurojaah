from .views import landing_page, listSurah
from django.urls import path
app_name = 'landing_page'
urlpatterns = [
    path('', landing_page, name="landing_page"),
    path('api/', listSurah, name="listSurah")
]