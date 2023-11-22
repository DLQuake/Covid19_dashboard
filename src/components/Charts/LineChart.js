import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineChart = ({ data }) => {
	const chartRef = useRef(null);

	useEffect(() => {
		if (!data || !data.cases) {
			return;
		}

		const dates = Object.keys(data.cases);
		const cases = Object.values(data.cases);
		const deaths = Object.values(data.deaths);
		const recovered = Object.values(data.recovered);

		const ctx = chartRef.current.getContext('2d');

		if (chartRef.current.chart) {
			chartRef.current.chart.destroy();
		}

		chartRef.current.chart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: dates,
				datasets: [
					{
						label: 'Cases',
						data: cases,
						borderColor: 'rgba(75, 192, 192, 1)',
						fill: false,
					},
					{
						label: 'Deaths',
						data: deaths,
						borderColor: 'rgba(255, 0, 0, 1)',
						fill: false,
					},
					{
						label: 'Recovered',
						data: recovered,
						borderColor: 'rgba(0, 128, 0, 1)',
						fill: false,
					},
				],
			},
		});
	}, [data]);

	return (
        <div className="box has-text-centered">
            <h3 className="title is-4">Line Chart</h3>
            <canvas ref={chartRef} />
        </div>
    );
};

export default LineChart;
