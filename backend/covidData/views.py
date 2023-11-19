from rest_framework import generics
from rest_framework.response import Response
from .models import CovidData
from .serializers import CovidDataSerializer
import requests

class CovidDataList(generics.ListAPIView):
    queryset = CovidData.objects.all()
    serializer_class = CovidDataSerializer

    def get(self, request, *args, **kwargs):
        # Pobierz dane z API
        api_url = "https://disease.sh/v3/covid-19/countries"
        response = requests.get(api_url)
        data = response.json()

        # Zapisz lub zaktualizuj dane w bazie
        for entry in data:
            country_name = entry.get("country", "")
            cases = entry.get("cases", 0)
            deaths = entry.get("deaths", 0)
            recovered = entry.get("recovered", 0)

            # Sprawdź, czy dane dla danego kraju już istnieją w bazie
            covidData, created = CovidData.objects.get_or_create(
                country=country_name,
                defaults={'cases': cases, 'deaths': deaths, 'recovered': recovered}
            )

            # Jeśli dane już istnieją, zaktualizuj je
            if not created:
                covidData.cases = cases
                covidData.deaths = deaths
                covidData.recovered = recovered
                covidData.save()

        return self.list(request, *args, **kwargs)
