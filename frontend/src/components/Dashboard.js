import React, { useEffect, useState } from 'react';
import CountryChart from './CountryChart';
import MapChart from './MapChart';
import axios from 'axios';

const Dashboard = () => {
  const [covidData, setCovidData] = useState([]);

  useEffect(() => {
    // Pobierz dane z API
    axios.get('http://localhost:8000/api/covid-data/')
      .then(response => {
        setCovidData(response.data);
      })
      .catch(error => {
        console.error('Błąd podczas pobierania danych:', error);
      });
  }, []);

  console.log(covidData);
  return (
    <div>
      <h1>COVID-19 Dashboard</h1>
      <MapChart data={covidData} />
      <CountryChart data={covidData} />
    </div>
  );
};

export default Dashboard;
