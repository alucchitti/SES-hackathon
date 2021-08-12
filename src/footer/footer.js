import React from "react";
import "../App.css";
import "./footer.css";
import logo from './cap_one_logo.png'

class Footer extends React.Component {
    render(){
        return (
            <div className="footer-wrapper">
                <img src={logo} alt="Logo" width="100"/>
            </div>
        )
    }
}

export default Footer;
