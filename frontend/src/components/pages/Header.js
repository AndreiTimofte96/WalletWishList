import React, {Component} from 'react';
import logo_img from '../../styles/images/logo1.png';
import { NavLink } from 'react-router-dom';


export default class Header extends Component{
    constructor(props){
        super(props);
    }


    render(){
        return(
            <div className="header-container">
             <div className="float-left">
                <img src={logo_img} className="logo"/>
            </div>
            <div className="float-left">
                
                <NavLink to="/homepage" className="navLinks"> <i className="fas fa-grin-hearts"/>Wish List</NavLink>
                <NavLink to="/history" className="navLinks"> <i className="fas fa-wallet"/> Wallet History</NavLink>
            </div>
            <div className="float-right">
                <div className="user"> <i className="fas fa-user"/> Costel</div>
            </div>
            </div>
        );
    }
}