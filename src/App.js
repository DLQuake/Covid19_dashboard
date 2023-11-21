import React, { useEffect, useState } from 'react';
import Statistics from './components/Statistics.js';
// import LineChart from './components/Charts/LineChart.js';
import BarChart from './components/Charts/BarChart.js';
// import PieChart from './components/Charts/PieChart.js';
// import HeatMap from './components/Charts/HeatMap.js';
import './styles/App.css';  // Global styles
import 'bulma/css/bulma.css';  // Bulma styles
import covidAPI from './services/covidAPI.js';

const App = () => {
	const [globalStats, setGlobalStats] = useState(null);

	useEffect(() => {
		const fetchGlobalStats = async () => {
			try {
				const response = await covidAPI.getGlobalStatistics();
				console.log('App - Global Stats:', response);
				setGlobalStats(response);
			} catch (error) {
				console.error('Error fetching global statistics:', error);
			}
		};

		fetchGlobalStats();
	}, []);

	return (
		<div className="app-container">
			<header>
				<h1>COVID-19 Dashboard</h1>
			</header>
			<main>
				<Statistics />
				{/* <LineChart /> */}
				<BarChart data={globalStats} />
				{/* <PieChart /> */}
				{/* <HeatMap /> */}
			</main>
			<footer>
				<p>&copy; 2023 COVID-19 Dashboard</p>
			</footer>
		</div>
	);
};

export default App;
