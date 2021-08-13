import React from 'react';
import PropTypes from 'prop-types'
import { Line } from 'react-chartjs-2';
//import * as ChartAnnotation from 'chartjs-plugin-annotation';
import PieChart from '../pie/Pie.js';

const budgetLimit = 110;


// HARDCODED TEST VALUES!!!

const periodSelections = [
  'yearly', 'monthly', 'weekly', 'daily?'
]


class LineChart extends React.Component {

  constructor(props) {
    super(props);

    this.graphData = props;
    this.state = {
      pieChartValues: null, // pie chart values reflect data of current dot on line graph
    }

    // idk if we need state?
  }


  render() {
    console.log(this.props.data);
    let dict = [];
    for(let i = 0; i < this.props.data.length; i++){
      if(dict[this.props.data[i]["date"]] != null){
        dict[this.props.data[i]["date"]] += this.props.data[i]["amount"];
      } else{
        dict[this.props.data[i]["date"]] = this.props.data[i]["amount"];
      }
    }
    console.log(dict);
    let labels = Object.keys(dict);
    let ldata = {
      labels: labels,
      datasets: [{
        labels: "My Spending",
        data: Object.values(dict),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };

    // Chart.options (refer to chart.js) used for LineChart component constructor
    let options = {
      scales: {
        yAxes: [
          {
            gridLines: [{
              drawTicks: true,
              display: true
            }]
          },
        ],
        xAxes: [{
          type: 'time',
          position: 'bottom',
          time: {
            displayFormats: { 'day': 'MM/YY' },
            tooltipFormat: 'MM/DD/YY',
            unit: 'month',
          }
        }],
      },

      /* when a dot is clicked on , show new pie chart*/
      onClick: (e) => {
        console.log(e);
          this.setState({ pieChartValues: [e.x, e.y]}) // pie values depend on current point's x and y
      }
    }


    return (
      <div className="line-chart-container">
        <Line data={ldata} options={options} />

        {console.log(this.state.pieChartValues)}
        { /* condition ? what gets displayed when condition true : when condition false */
          this.state.pieChartValues !== null ? <PieChart budgetValues={this.state.pieChartValues}/> : <></> }
      </div>
    );
  }
}

export default LineChart;
