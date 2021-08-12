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
var categories = ['furniture', 'tech', 'food', 'health'];

class Main extends React.Component {
  constructor(props){
    super(props);
    this.id = props.id
    this.state = {
      firstName: null,
      lastName: null,
      purchaseData: []
    }
    this.handleSubmitevents = this.handleSubmitevents.bind(this)
  }
  handleSubmitevents() {
    Cookies.remove('accountId')
    window.location.reload();
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
                  response.data.forEach(async element => {
                    console.log(element.merchant_id)
                    var merchant_info = await this.merchants.filter(function(merchant) { //match merchant id to the merchant
                        if(merchant._id === element.merchant_id){
                          console.log("found merchant!")
                        }
                        return merchant._id === element.merchant_id; 
                    })
                    var category = await categories.filter(function (category) {
                      return category === element.description
                    })
                    if(category[0] == null){
                      category.push("other")
                    }
                    var newData = {
                      date: element.purchase_date,
                      amount: element.amount,
                      merchant_id: element.merchant_id,
                      merchant_name: merchant_info[0].name,
                      merchant_category: category[0],
                      card: card.nickname
                    }
                    console.log(newData);
                    this.setState({ purchaseData: [...this.state.purchaseData, newData]})
                  });
                })
              });
            }).catch((err, response) => {
              //err getting transactions
          })
          }).catch((err, response) => {
            console.log(err);
            alert("error getting data 2")
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
        <p id="header"><img src={logo} alt="Smart Budget logo"></img>
          <div className="logout">
            <input type="submit" value="Logout" data-test="submit" onClick={this.handleSubmitevents} className="button" />
          </div>
        </p>
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
  props.transactions.sort(function(a, b){ //sort them by dates
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
  var previousDate = null;
  const transactions = props.transactions.map((transaction) => {
      if(previousDate !== transaction.date){
        previousDate = transaction.date;
        return (
          <div>
            <div className="date">{previousDate}</div>
            <div className="transaction">
              <div className="value">${transaction.amount}</div>
              <div className="info">
            <div>
              {transaction.card}
            </div>
            {transaction.merchant_name}
            <div>
            {transaction.merchant_category}
            </div>
          </div>  
            </div>
          </div>
        )
      }
      return (
        <div className="transaction">
          <div className="value">${transaction.amount}</div>
          <div className="info">
            <div>
              {transaction.card}
            </div>
            {transaction.merchant_name}
            <div>
            {transaction.merchant_category}
            </div>
          </div>  
        </div>
      )
  })
  console.log(transactions);
  return(
    <div className="transactions">
      {transactions}
    </div>
  )
}
export default Main;
