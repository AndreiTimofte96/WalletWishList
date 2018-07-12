import React, { Component } from 'react';
import logo_img from '../../styles/images/logo1.png';
import { NavLink } from 'react-router-dom';


export default class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            menuOpened: false
        };

        this.handleLogout = this.handleLogout.bind(this);
        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    handleLogout() {

        localStorage.removeItem('wishList_token');
        this.props.history.push('/login');
    }

    handleMenuClick() {
        this.setState({ menuOpened: !this.state.menuOpened });
    }

    render() {

        const { userName } = this.props;
        const { menuOpened } = this.state;

        return (
            <div className="header-container">
                <div className="float-left">
                    <img src={logo_img} className="logo" />
                </div>

                {window.innerWidth < 1000 &&
                    <div>
                        <div className="float-right">
                            <div className="user"> <i className="fas fa-user" /> {userName}</div>
                            <div className={`user menu-button ${menuOpened && "active"}`} onClick={this.handleMenuClick}> <i className="fas fa-bars" /> </div>
                        </div>
                        {menuOpened === true &&
                            <div className="responsive-menu">
                                <NavLink to="/homepage" className="navLinks"> <i className="fas fa-grin-hearts" />Wish List</NavLink>
                                <NavLink to="/history" className="navLinks"> <i className="fas fa-wallet" /> Finished List</NavLink>
                                <div className="user logout" onClick={this.handleLogout}> <i className="fas fa-sign-out-alt" /> Logout</div>
                            </div>
                        }
                    </div>
                }
                {window.innerWidth > 1000 &&
                    <div>
                        <div className="float-left">
                            <NavLink to="/homepage" className="navLinks"> <i className="fas fa-grin-hearts" />Wish List</NavLink>
                            <NavLink to="/history" className="navLinks"> <i className="fas fa-wallet" /> Finished List</NavLink>
                        </div>

                        <div className="float-right">
                            <div className="user logout" onClick={this.handleLogout}> <i className="fas fa-sign-out-alt" /> Logout</div>
                        </div>
                        <div className="float-right">
                            <div className="user"> <i className="fas fa-user" /> {userName}</div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}