import './Line.css';
import { Line } from 'react-chartjs-2';

const data = {
    labels: ['1', '2', '3', '4', '5', '6'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        fill: false,
        backgroundColor: 'rgb(0, 58, 111)',
        borderColor: 'rgb(0, 58, 111, .2)',
      },
    ],
};
  
const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
};

const LineChart = () => (
    <Line data={data} options={options}/>
);

export default LineChart;