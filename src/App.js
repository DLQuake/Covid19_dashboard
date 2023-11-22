import React, { useEffect, useState } from 'react';
import Statistics from './components/Statistics.js';
import LineChart from './components/Charts/LineChart.js';
import BarChart from './components/Charts/BarChart.js';
import PieChart from './components/Charts/PieChart.js';
import CountryTable from './components/CountryTable.js';
import './styles/App.css';
import 'bulma/css/bulma.css'; // Import stylów Bulmy
import covidAPI from './services/covidAPI.js';

const App = () => {
	const [globalStats, setGlobalStats] = useState();
	const [historicalData, setHistoricalData] = useState();
	const [countryData, setCountryData] = useState();

	useEffect(() => {
		const fetchGlobalStats = async () => {
			try {
				const response = await covidAPI.getGlobalStatistics();
				setGlobalStats(response);
			} catch (error) {
				console.error('Error fetching global statistics:', error);
			}
		};

		const fetchHistoricalData = async () => {
			try {
				const response = await covidAPI.getHistoricalData('all');
				setHistoricalData(response);
			} catch (error) {
				console.error('Error fetching historical data:', error);
			}
		};

		const fetchCountriesData = async () => {
			try {
				const response = await covidAPI.getCountryStatistics('');
				setCountryData(response);
			} catch (error) {
				console.error('Error fetching historical data:', error);
			}
		};

		fetchGlobalStats();
		fetchHistoricalData();
		fetchCountriesData();
	}, []);

	console.log(historicalData);

	return (
		<div className="app-container has-background-dark">
			<section className="hero is-primary">
				<div className="hero-body">
					<div className="container">
						<h1 className="title has-text-centered">COVID-19 Dashboard</h1>
					</div>
				</div>
			</section>
			<section className="section">
				<div className="container">
					<Statistics />
					<div className="columns">
						<div className="column is-half">
							<LineChart data={historicalData} />
						</div>
						<div className="column is-half">
							<BarChart data={globalStats} />
						</div>
					</div>
					<div className="columns">
						<div className="column is-one-third">
							<PieChart data={countryData} dataType="cases" />
						</div>
						<div className="column is-one-third">
							<PieChart data={countryData} dataType="deaths" />
						</div>
						<div className="column is-one-third">
							<PieChart data={countryData} dataType="recovered" />
						</div>
					</div>
					<CountryTable />
				</div>
			</section>
			<footer className="footer has-background-primary">
				<div className="content has-text-centered">
					<h3 className="has-text-white">&copy; 2023 COVID-19 Dashboard</h3>
				</div>
			</footer>
		</div>
	);
};

export default App;
