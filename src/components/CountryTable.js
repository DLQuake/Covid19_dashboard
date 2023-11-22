import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CountryTable = () => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchCountryData = async () => {
            try {
                const response = await axios.get('https://disease.sh/v3/covid-19/countries/');
                setCountries(response.data);
            } catch (error) {
                console.error('Error fetching country data:', error);
            }
        };

        fetchCountryData();
    }, []);

    return (
        <div className="table-container">
            <table className="table is-fullwidth">
                <thead>
                    <tr>
                        <th>Flag</th>
                        <th>Country</th>
                        <th>Cases</th>
                        <th>Deaths</th>
                        <th>Recovered</th>
                    </tr>
                </thead>
                <tbody>
                    {countries.map((country) => (
                        <tr key={country.country}>
                            <td>
                                <img
                                    src={country.countryInfo.flag}
                                    alt={`Flag of ${country.country}`}
                                    className="flag-image"
                                    style={{height:40}}
                                />
                            </td>
                            <td>{country.country}</td>
                            <td>{country.cases}</td>
                            <td>{country.deaths}</td>
                            <td>{country.recovered}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CountryTable;
