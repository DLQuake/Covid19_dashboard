import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    let chartInstance;

    if (data && chartRef.current) {
      const transformedData = {
        labels: data.map((entry) => entry.date),
        datasets: [
          {
            label: 'Cases',
            data: data.map((entry) => entry.cases),
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            fill: false,
          },
          {
            label: 'Deaths',
            data: data.map((entry) => entry.deaths),
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: false,
          },
          {
            label: 'Recovered',
            data: data.map((entry) => entry.recovered),
            borderColor: 'rgba(255, 205, 86, 1)',
            borderWidth: 1,
            fill: false,
          },
        ],
      };

      const ctx = chartRef.current.getContext('2d');

      // Zniszcz poprzedni wykres przed utworzeniem nowego
      if (chartInstance) {
        chartInstance.destroy();
      }

      chartInstance = new Chart(ctx, {
        type: 'line',
        data: transformedData,
        options: {
          scales: {
            x: {
              type: 'category',
            },
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    // Czyść wykres przed odmontowaniem komponentu
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default LineChart;
