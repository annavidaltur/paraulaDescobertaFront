import React from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
);

export const options = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  scales: {
    x: {
      min: 0,
      max: 100,
    },
  },
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: false
    },
    tooltip: {
      callbacks: {
        label: function(context) {          
          let label = context.dataset.label || '';
          label += context.raw + '%';
          return label;
        }
      }
    }
  },
};

const labels = ['#6','#5','#4','#3','#2','#1'];

const AttemptsChart = ({stats}) => {
  if (!stats) {
    return null;
  }

  console.log('stats', stats)
  const data = {
    labels,
    datasets: [
      {        
        data: [
          (stats.attempts6*100/stats.nGuessed).toFixed(2),
          (stats.attempts5*100/stats.nGuessed).toFixed(2),
          (stats.attempts4*100/stats.nGuessed).toFixed(2),
          (stats.attempts3*100/stats.nGuessed).toFixed(2),
          (stats.attempts2*100/stats.nGuessed).toFixed(2),
          (stats.attempts1*100/stats.nGuessed).toFixed(2)
        ],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };
  return (
      <Bar options={options} data={data} />
  )
};

export default AttemptsChart;
