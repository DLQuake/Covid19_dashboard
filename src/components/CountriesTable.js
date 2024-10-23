"use client";
import { useState, useEffect } from 'react';
import { fetchCountriesData } from '@/lib/covidApi';
import Link from 'next/link';

export default function CountriesTable() {
    const [countries, setCountries] = useState([]);
    const [filter, setFilter] = useState('');
    const [sortField, setSortField] = useState('country');
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        const getData = async () => {
            const countriesData = await fetchCountriesData();
            setCountries(countriesData);
        };
        getData();
    }, []);

    const filteredCountries = countries.filter(country =>
        country.country.toLowerCase().includes(filter.toLowerCase())
    );

    const sortedCountries = [...filteredCountries].sort((a, b) => {
        const aValue = sortField === 'country' ? a.country : a[sortField];
        const bValue = sortField === 'country' ? b.country : b[sortField];

        if (sortOrder === 'asc') {
            return typeof aValue === 'string' ? aValue.localeCompare(bValue) : aValue - bValue;
        }
        return typeof aValue === 'string' ? bValue.localeCompare(aValue) : bValue - aValue;
    });

    const handleSort = (field) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };

    return (
        <div className="table-container">
            {/* Search input */}
            <div className="field sticky-search">
                <label className="label">Filter Countries:</label>
                <div className="control">
                    <input
                        type="text"
                        className="input"
                        placeholder="Search by country name"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                </div>
            </div>

            {/* Wrapper for the table to enable horizontal scrolling */}
            <div className="table-wrapper">
                <table className="table is-fullwidth is-striped is-hoverable">
                    <thead>
                        <tr>
                            <th>Flag</th>
                            <th onClick={() => handleSort('country')} style={{ cursor: 'pointer' }}>
                                Country {sortField === 'country' && (sortOrder === 'asc' ? '▲' : '▼')}
                            </th>
                            <th onClick={() => handleSort('cases')} style={{ cursor: 'pointer' }}>
                                Cases {sortField === 'cases' && (sortOrder === 'asc' ? '▲' : '▼')}
                            </th>
                            <th onClick={() => handleSort('deaths')} style={{ cursor: 'pointer' }}>
                                Deaths {sortField === 'deaths' && (sortOrder === 'asc' ? '▲' : '▼')}
                            </th>
                            <th onClick={() => handleSort('recovered')} style={{ cursor: 'pointer' }}>
                                Recovered {sortField === 'recovered' && (sortOrder === 'asc' ? '▲' : '▼')}
                            </th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedCountries.map((country) => (
                            <tr key={country.countryInfo._id || country.country}>
                                <td>
                                    <figure className="image is-48x48">
                                        <img src={country.countryInfo.flag} alt={`Flag of ${country.country}`} />
                                    </figure>
                                </td>
                                <td>
                                    {country.country}
                                </td>
                                <td>{country.cases.toLocaleString()}</td>
                                <td>{country.deaths.toLocaleString()}</td>
                                <td>{country.recovered.toLocaleString()}</td>
                                <td>
                                    <Link href={`/${country.country}`} className="button is-primary">
                                        View Details
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
