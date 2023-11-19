from django.contrib import admin
from .models import CovidData

@admin.register(CovidData)
class CovidDataAdmin(admin.ModelAdmin):
    list_display = ('country', 'cases', 'deaths', 'recovered')
