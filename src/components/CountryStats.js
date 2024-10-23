import React from 'react';
import StatItem from './StatItem';

const CountryStats = ({ cases, deaths, recovered, population, lastUpdated }) => {
    return (
        <div className="box">
            <h2 className="title has-text-centered">COVID-19 Statistics</h2>
            <div className="level">
                <StatItem heading="Cases" value={cases} />
                <StatItem heading="Deaths" value={deaths} />
                <StatItem heading="Recovered" value={recovered} />
                <StatItem heading="Population" value={population} />
                <StatItem heading="Last Updated" value={lastUpdated} />
            </div>
        </div>
    );
};

export default CountryStats;
