"use client";
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { fetchGlobalHistoricalData } from '@/lib/covidApi';
import {Chart, registerables} from 'chart.js';

Chart.register(...registerables);

const GlobalChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        cases: [],
        deaths: [],
        recovered: [],
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchGlobalHistoricalData();
                const dates = Object.keys(data.cases);
                const cases = Object.values(data.cases);
                const deaths = Object.values(data.deaths);
                const recovered = Object.values(data.recovered);

                setChartData({
                    labels: dates,
                    cases,
                    deaths,
                    recovered,
                });
            } catch (error) {
                console.error('Error fetching global historical data:', error);
                setError('Failed to load data.');
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
        interaction: {
            mode: 'index',
            intersect: false
        },
    };

    return (
        <div>
            <h2 className="subtitle has-text-centered">Global COVID-19 Trends (from 08.02.2023 to 09.03.2023)</h2>

            <div className="box">
                <h3 className="title is-5 has-text-centered">Cases Over Time</h3>
                <Line
                    data={{
                        labels: chartData.labels,
                        datasets: [{
                            label: 'Cases',
                            data: chartData.cases,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            fill: true,
                        }]
                    }}
                    options={options}
                />
            </div>

            <div className="box">
                <h3 className="title is-5 has-text-centered">Deaths Over Time</h3>
                <Line
                    data={{
                        labels: chartData.labels,
                        datasets: [{
                            label: 'Deaths',
                            data: chartData.deaths,
                            borderColor: 'rgba(255, 99, 132, 1)',
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            fill: true,
                        }]
                    }}
                    options={options}
                />
            </div>

            <div className="box">
                <h3 className="title is-5 has-text-centered">Recovered Over Time</h3>
                <Line
                    data={{
                        labels: chartData.labels,
                        datasets: [{
                            label: 'Recovered',
                            data: chartData.recovered,
                            borderColor: 'rgba(72, 199, 142, 1)',
                            backgroundColor: 'rgba(72, 199, 142, 0.2)',
                            fill: true,
                        }]
                    }}
                    options={options}
                />
            </div>
        </div>
    );
};

export default GlobalChart;
