import React from 'react';

const CountryChart = ({ data }) => {
  // Implementuj logikę wykresu dla danych krajowych
  return (
    <div>
      <h2>Country Chart</h2>
      {/* Dodaj wykres dla danych krajowych */}
      <table>
        <thead>
          <tr>
            <th>Country</th>
            <th>Cases</th>
            <th>Deaths</th>
            <th>Recovered</th>
          </tr>
        </thead>
        <tbody>
          {data.map((countryData, index) => (
            <tr key={index}>
              <td>{countryData.country}</td>
              <td>{countryData.cases}</td>
              <td>{countryData.deaths}</td>
              <td>{countryData.recovered}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CountryChart;
