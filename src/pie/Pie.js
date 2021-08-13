import './Pie.css';
import { Pie } from 'react-chartjs-2';


function PieChart(props) {

  var data = {
    labels: props.categoryLabels, // Input categories
    datasets: [
      {
        label: '# of Votes',
        data: props.budgetValues,// Money sums for each category props.budgetValues,
        backgroundColor: [
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Pie data={data} />
      </>
  );
}

export default PieChart;
