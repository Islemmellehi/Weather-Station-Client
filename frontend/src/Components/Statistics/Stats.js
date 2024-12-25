import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import './Stats.css';

const Stats = () => {
  const [chartData, setChartData] = useState({ labels: [], temperature: [], humidity: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/data');
        const data = await response.json();

        const labels = data.map(item =>
          new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        ); // Format time as HH:MM
        const temperature = data.map(item => item.temperatureCelsius);
        const humidity = data.map(item => item.humidityPercentage);

        setChartData({ labels, temperature, humidity });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (chartData.labels.length) {
      const ctx = document.getElementById('myChart').getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: chartData.labels,
          datasets: [
            {
              label: 'Temperature (°C)',
              data: chartData.temperature,
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              yAxisID: 'temperature',
            },
            {
              label: 'Humidité (%)',
              data: chartData.humidity,
              borderColor: 'rgb(54, 162, 235)',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              yAxisID: 'humidity',
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            temperature: {
              type: 'linear',
              position: 'left',
              title: {
                display: true,
                text: 'Temperature (°C)',
              },
            },
            humidity: {
              type: 'linear',
              position: 'right',
              title: {
                display: true,
                text: 'Humidity (%)',
              },
              grid: {
                drawOnChartArea: false, // Prevent grid lines from overlapping
              },
            },
          },
        },
      });
    }
  }, [chartData]);

  return (
    <div id="chart-container">
      <canvas id="myChart"></canvas>
    </div>
  );
};

export default Stats;
