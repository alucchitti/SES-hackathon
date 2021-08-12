import "../App.css";
import Cookies from "js-cookie";
import "./Main.css";
/* Chartjs Examples: https://reactchartjs.github.io/react-chartjs-2/#/ */
import LineChart from "../line/Line.js";
import React from 'react';
import logo from './SmartBudget.png';
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
      lastName: null,
      purchaseData: []
    }
  }
  componentDidMount(){
    var self = this;
    axios.get(`${baseUrl}/merchants?key=${apiKey}`).then((response) => { //get all merchants
        this.merchants = response.data;
        console.log(response.data);
        axios.get(`${baseUrl}/customers/${this.id}?key=${apiKey}`).then((response) => { //get the information about the customer
          console.log(response.data);
          this.setState({firstName: response.data.first_name, lastName: response.data.last_name});
          axios.get(`${baseUrl}/customers/${self.id}/accounts?key=${apiKey}`).then((response) => { //get all accounts under customer
            console.log(response.data);
              response.data.forEach(card => {
                axios.get(`${baseUrl}/accounts/${card._id}/purchases?key=${apiKey}`).then((response) => { //get all purchases under each of the customers accounts
                  response.data.forEach(element => {
                    var merchant = this.merchants.filter(function(merchant) { //match merchant id to the merchant
                        return merchant._id === element.merchant_id; 
                    })
                    this.setState({ purchaseData: [...this.state.purchaseData, {
                      date: element.purchase_date,
                      amount: element.amount,
                      merchant_id: element.merchant_id,
                      merchant_name: merchant[0].name,
                      merchant_category: merchant[0].category,
                      card: card.nickname
                    }]})
                  });
                })
              });
            }).catch((err, response) => {
              //err getting transactions
          })
          }).catch((err, response) => {
            console.log(err);
            alert("error getting data")
              Cookies.remove('accountId');
              window.location.reload();
        })
      }).catch((err, response) => {
        console.log(err);
    })
  }
  render(){
    return(
      <div id="Main">
      <div>
        <p id="header"><img src={logo} alt="Smart Budget logo"></img></p>
      </div>
      
        <div className="center">
          <LineChart />
        </div>
        <br></br>

        <Transactions transactions={this.state.purchaseData}/>
      </div>
    );
  }
};

function Transactions(props){
  const transactions = props.transactions.map((transaction) => {
      return <div className="transaction">Paid ${transaction.amount} using {transaction.card}</div>
  })
  console.log(transactions);
  return(
    <div className="transactions">
      {transactions}
    </div>
  )
}
export default Main;
