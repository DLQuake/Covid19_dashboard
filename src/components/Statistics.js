import React, { useEffect, useState } from 'react';
import covidAPI from '../services/covidAPI.js';

const Statistics = () => {
    const [globalStats, setGlobalStats] = useState({
        cases: 0,
        deaths: 0,
        recovered: 0,
    });

    useEffect(() => {
        const fetchGlobalStats = async () => {
            try {
                const response = await covidAPI.getGlobalStatistics();
                setGlobalStats(response);
            } catch (error) {
                console.error('Błąd pobierania statystyk:', error);
            }
        };
        fetchGlobalStats();
    }, []);

    return (
        <div className="statistics-container">
            <h2>Global Statistics</h2>
            <div className="statistic">
                <div className="statistic-label">Cases:</div>
                <div className="statistic-value">{globalStats && globalStats.cases}</div>
            </div>
            <div className="statistic">
                <div className="statistic-label">Deaths:</div>
                <div className="statistic-value">{globalStats && globalStats.deaths}</div>
            </div>
            <div className="statistic">
                <div className="statistic-label">Recovered:</div>
                <div className="statistic-value">{globalStats && globalStats.recovered}</div>
            </div>
        </div>
    );
};

export default Statistics;
