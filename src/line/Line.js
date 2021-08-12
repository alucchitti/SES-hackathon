import './Line.css';
import { Line } from 'react-chartjs-2';
import PieChart from '../pie/Pie.js';
import {useState} from "react";

function LineChart() {
  const [pieChartValues, setPieChartValues] = useState(null); // pie chart values reflect data of current dot on line graph

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

      /* when a dot is clicked on , show new pie chart*/
      onClick: (e) => {
        console.log(e);
        setPieChartValues([e.x, e.y, e.x, e.y,]); // pie values depend on current point's x and y
      }

  };

  return (
    <>
      <Line data={data} options={options}/>

      { /* condition ? what gets displayed when condition true : when condition false */
        pieChartValues !== null ? <PieChart budgetValues={pieChartValues}/> : <></> }

      </>
  );
}

export default LineChart;
