import React from 'react';
import '../App.css';
import './header.css';

class Header extends React.Component {
    render(){
        return (
            <div className="center-wrapper">
                <p className="name">SmartBudget</p>
            </div>
        )
    }
}

export default Header;
