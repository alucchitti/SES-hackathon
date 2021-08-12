import "../App.css";
import Cookies from "js-cookie";
import "./Main.css";
/* Chartjs Examples: https://reactchartjs.github.io/react-chartjs-2/#/ */
import LineChart from "../line/Line.js";
import React from 'react';
import PieChart from "../pie/Pie.js";
import axios from "axios";

var apiKey = '1cb35cfe6eeba07ad5afa33e1e997d12'
var baseUrl = 'http://api.nessieisreal.com'

class Main extends React.Component {
  constructor(props){
    super(props);
    this.id = props.id
    this.state = {
      firstName: null,
      lastName: null
    }
  }
  componentDidMount(){
    axios.get(`${baseUrl}/customers/${this.id}?key=${apiKey}`).then((response) => {
      console.log(response.data);
      this.setState({firstName: response.data.first_name, lastName: response.data.last_name});
      }).catch((err, response) => {
        console.log(err);
        alert("error getting data")
          Cookies.remove('accountId');
          window.location.reload();
    })

    axios.get(`${baseUrl}/accounts/${this.id}?key=${apiKey}`).then((response) => {
      console.log(response.data);
      this.setState({balance: response.data.balance});
      }).catch((err, response) => {
        console.log(err);
        alert("error getting data")
          Cookies.remove('accountId');
          window.location.reload();
    })
  }

  render(){
    return(
      <div id="Main">
      <div>
        <p id="header">Welcome back {this.state.firstName} {this.state.lastName} (UID: {this.id})</p>
      </div>
      <hr id="spacer" />
      <div className="center-wrapper">
        <div>
          {this.state.balance}
          Current Balance
        </div>
        <div className="center">
          <LineChart />
        </div>
        <div className="center">
        </div>
      </div>
      </div>
    );
  }
};

export default Main;
