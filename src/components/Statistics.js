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
            <h2 className="title is-3 has-text-centered has-text-white">Global Statistics</h2>
            <div className="columns">
                <div className="column">
                    <div className="box has-background-primary has-text-centered">
                        <h3 className="subtitle is-5 has-text-white">Cases</h3>
                        <p className="is-size-4 has-text-white">{globalStats && globalStats.cases}</p>
                    </div>
                </div>
                <div className="column">
                    <div className="box has-background-danger has-text-centered">
                        <h3 className="subtitle is-5 has-text-white">Deaths</h3>
                        <p className="is-size-4 has-text-white">{globalStats && globalStats.deaths}</p>
                    </div>
                </div>
                <div className="column">
                    <div className="box has-background-success has-text-centered">
                        <h3 className="subtitle is-5 has-text-white">Recovered</h3>
                        <p className="is-size-4 has-text-white">{globalStats && globalStats.recovered}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Statistics;
