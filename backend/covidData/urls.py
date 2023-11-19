from django.urls import path
from .views import CovidDataList

urlpatterns = [
    path('covid-data/', CovidDataList.as_view(), name='covid-data-list'),
    # Dodaj inne trasy, jeśli są potrzebne
]
