import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { CDBContainer } from 'cdbreact';

// Register required chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BornBaby = () => {
  const [data, setData] = useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: '',
        backgroundColor: 'rgba(194, 116, 161, 0.5)',
        borderColor: 'rgb(194, 116, 161)',
        borderWidth: 1,
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = data.labels.map(() =>
        Math.floor(Math.random() * (100 - 10 + 1) + 10) // Generate random values between 10 and 100
      );

      setData((prevData) => ({
        ...prevData,
        datasets: [
          {
            ...prevData.datasets[0],
            data: newData,
          },
        ],
      }));
    }, 5000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [data.labels]);

  return (
    <CDBContainer>
      <div style={{ height: '250px' }}>
        <Bar
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false, // Allow custom height
            plugins: {
              legend: {
                display: true,
                position: 'top',
              },
              title: {
                display: true,
                text: '',
              },
            },
            scales: {
              x: {
                type: 'category', // Ensure category scale is used for the x-axis
              },
              y: {
                beginAtZero: true,
                min: 0,
                max: 120, // Allow some buffer above 100
                ticks: {
                  stepSize: 10, // Set increments to 10
                },
              },
            },
          }}
        />
      </div>
    </CDBContainer>
  );
};

export default BornBaby;
