import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router-dom';
import {login} from '../../actions/authenticationActions';
import Loader from '../../components/utils/Loader';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''  
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.hanglePasswordChange = this.hanglePasswordChange.bind(this);
    this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
  }
  
  handleEmailChange(e){
    this.setState({
      email: e.target.value
    });
  }

  hanglePasswordChange(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleSubmitLogin(e) {
    e.preventDefault();
    const {email, password} = this.state;
    const _props = this.props;
    this.props.login(email, password, _props);
  }
  
  render() {

    const {email, password} = this.state;
    const {isLoginPending} = this.props;

    
    return (
      <div className="login-page">
        <form onSubmit={this.handleSubmitLogin}>
          <h2 className="text-center">Sign in to Wallet Wish List</h2><br />
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Email" value={email} onChange={this.handleEmailChange}/>
          </div>
          <div className="form-group">
            <input type="password" className="form-control" placeholder="Password" value={password} onChange={this.hanglePasswordChange}/>
            
            <span className="forgot-password float-left">Forgot Password?</span>
           <Link to="/register" className="forgot-password">
            <span className="forgot-password float-right">or Register...</span>
           </Link>  
            
          </div>
          <div className="login-button-wrapper text-center">
            <button type="submit" className="btn login-button">Login</button>
          </div><br />
          <div className={`alert alert-danger text-center ${this.props.isLoginError ? '' : 'display-none'}`} role="alert">
            <strong>{this.props.loginErrorMessage}</strong>
          </div>
          </form>
          {isLoginPending === true && <Loader/>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoginSuccess: state.authenticationReducer.isLoginSuccess,
    isLoginError: state.authenticationReducer.isLoginError,
    isLoginPending: state.authenticationReducer.isLoginPending,
    loginErrorMessage: state.authenticationReducer.errorMessage
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    login: (email, password, props) => login(email, password, props)
  }, dispatch);
}


export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Login);