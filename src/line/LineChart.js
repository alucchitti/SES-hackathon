import React from 'react';
import PropTypes from 'prop-types'
import { Line } from 'react-chartjs-2';
//import * as ChartAnnotation from 'chartjs-plugin-annotation';

const budgetLimit = 110;


// HARDCODED TEST VALUES!!!

const periodSelections = [
  'yearly', 'monthly', 'weekly', 'daily?'
]

// Chart.options (refer to chart.js) used for LineChart component constructor
const options = {
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
  annotation: {
    annotations: [{
      type: 'line',
      mode: 'horizontal',
      scaleID: 'y-axis-0',
      value: budgetLimit,
      borderColor: 'rgb(75, 192, 192)',
      borderWidth: 4,
      label: {
        enabled: true,
        content: 'Budget Limit'
      }
    }]
  }
}

class LineChart extends React.Component {
  constructor(props) {
    super(props);

    this.graphOptions = options;
    this.graphData = props;

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


    return (
      <div className="line-chart-container">
        <Line data={ldata} options={this.graphOptions} />
      </div>
    );
  }
}

export default LineChart;
