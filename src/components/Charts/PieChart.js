import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieChart = ({ data, dataType }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!data || !data.cases || !data.deaths || !data.recovered) {
      return;
    }

    const labels = ['Cases', 'Deaths', 'Recovered'];
    const values = [data.cases, data.deaths, data.recovered];

    const ctx = chartRef.current.getContext('2d');

    if (chartRef.current.chart) {
      chartRef.current.chart.destroy();
    }

    chartRef.current.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            data: values,
            backgroundColor: [
              'rgba(255, 99, 132, 0.7)',
              'rgba(54, 162, 235, 0.7)',
              'rgba(75, 192, 192, 0.7)',
            ],
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: `Distribution of ${dataType} in ${data.country}`,
          },
        },
      },
    });
  }, [data, dataType]);

  return (
    <div className="box has-text-centered">
      <h3 className="title is-4">Pie Chart</h3>
      <canvas ref={chartRef} />
    </div>
  );
};

export default PieChart;
