import React from 'react';
import '../App.css';
import './login.css';
import Cookies from 'js-cookie';
import axios from "axios";
import Header from '../header/header';
import Footer from '../footer/footer';

var apiKey = '1cb35cfe6eeba07ad5afa33e1e997d12'
var baseUrl = 'http://api.nessieisreal.com'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { accountId: "Account ID", error: false};
        this.handleSubmitevents = this.handleSubmitevents.bind(this)
        this.handleIdChange = this.handleIdChange.bind(this)
    }
    handleSubmitevents(event) {
        console.log(this.state.accountId);
        console.log(`${baseUrl}/customers/${this.state.accountId}?key=${apiKey}`)
        axios.get(`${baseUrl}/customers/${this.state.accountId}?key=${apiKey}`).then((response) => {
            console.log(response.data);
            if(response.data._id){
                this.setState({error: false})
                Cookies.set('accountId', response.data._id);
                window.location.reload();
            }
        }).catch((err, response) => {
            console.log(`There was an error signing you in ${err}`);
            this.setState({error: true})
        })
        //window.location.reload();
    }
    handleIdChange(event){
        this.setState({accountId: event.target.value})
    }
    render(){
        console.log(this.state.accountId);
        return (
            <div>
            <div className="center-wrapper">
                <div className="center3">
                    Welcome Back!
                    
                    <div className="signin">
                        <input type="text" data-test="accountId" placeholder="User ID" onChange={this.handleIdChange} className="textField"/>
                        <br></br>
                        <input type="submit" value="Sign In" data-test="submit" onClick={this.handleSubmitevents} className="button">
                            
                        </input>
                        {this.state.error && <p className="error">Login failed.</p>}
                    </div>
                </div>
            </div>
            <Footer />
            </div>
        ) 
    }
}

export default Login;
