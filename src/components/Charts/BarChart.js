import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BarChart = ({ data }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        let chartInstance;

        if (data && chartRef.current) {
            const transformedData = {
                labels: ['Cases', 'Deaths', 'Recovered'],
                datasets: [
                    {
                        label: 'Number of Cases, Deaths, Recovered',
                        data: [data.cases, data.deaths, data.recovered],
                        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(255, 205, 86, 0.2)'],
                        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)', 'rgba(255, 205, 86, 1)'],
                        borderWidth: 1,
                    },
                ],
            };

            const ctx = chartRef.current.getContext('2d');

            // Zniszcz poprzedni wykres przed utworzeniem nowego
            if (chartInstance) {
                chartInstance.destroy();
            }

            chartInstance = new Chart(ctx, {
                type: 'bar',
                data: transformedData,
                options: {
                    scales: {
                        x: {
                            type: 'category',
                        },
                        y: {
                            beginAtZero: true,
                            max: 20000000,
                            min: 0,
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

    return (
        <div className="box has-text-centered">
            <h3 className="title is-4">Bar Chart</h3>
            <canvas ref={chartRef} />
        </div>
    );
};

export default BarChart;
