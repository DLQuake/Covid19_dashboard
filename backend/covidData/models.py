from django.db import models

class CovidData(models.Model):
    country = models.CharField(max_length=255)
    cases = models.IntegerField()
    deaths = models.IntegerField()
    recovered = models.IntegerField()
    # Dodaj inne pola, które chciałbyś przechowywać

    def __str__(self):
        return self.country
