import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { register } from '../../actions/registerActions';
import Loader from '../../components/utils/Loader';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      userName: '',
      password: '',
      inputError: false,
      errorIndex: null,
      errorText: [
        'Username is required!', 
        'Email is required!', 
        'The email is not valid!', 
        'Password is required!',
        'Password must have at least 5 characters!'
       ]
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handleSubmitRegister = this.handleSubmitRegister.bind(this);
  }

  handleEmailChange(e) {
    this.setState({
      email: e.target.value,
      inputError: false
    });
  }

  handleUserNameChange(e) {
    this.setState({
      userName: e.target.value,
      inputError: false
    });
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value,
      inputError: false
    });
  }

  handleSubmitRegister(e) {

    e.preventDefault();
    const { email, password, userName } = this.state;
    const _props = this.props;


    if (userName.length === 0){
      this.setState({inputError: true, errorIndex: 0});
      return;
    }

    if (email.length === 0){
      this.setState({inputError: true, errorIndex: 1});
      return;
    }

    if ( (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    .test(email.toLowerCase()) === false){
      this.setState({inputError: true, errorIndex: 2});
      return;
    }

    if (password.length === 0){
      this.setState({inputError: true, errorIndex: 3});
      return;
    }

    if (password.length < 5){
      this.setState({inputError: true, errorIndex: 4});
      return;
    }



    this.props.register(email, password, userName, _props);
  }

  render() {

    const { email, password, userName, errorText, inputError, errorIndex } = this.state;
    const { isRegisterPending } = this.props;


    return (
      <div className="login-page">
        <form onSubmit={this.handleSubmitRegister}>
          <h2 className="text-center">Register to Wallet Wish List</h2><br />
          <div className="form-group">
            <input type="text" className="form-control" placeholder="User Name" value={userName} onChange={this.handleUserNameChange} />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Email" value={email} onChange={this.handleEmailChange} />
          </div>
          <div className="form-group">
            <input type="password" className="form-control" placeholder="Password" value={password} onChange={this.handlePasswordChange} />

            <Link to="/" className="forgot-password">
              <span className="forgot-password float-right">or Login...</span>
            </Link>

          </div>
          <div className="login-button-wrapper text-center">
            <button type="submit" className="btn login-button">Register</button>
          </div><br />
          <div className={`alert alert-danger text-center ${this.props.isRegisterError ? '' : 'display-none'}`} role="alert">
            <strong>{this.props.registerErrorMessage}</strong>
          </div>

          {
            inputError === true &&
            <div className={`alert alert-danger text-center`} role="alert">
              <strong>{errorText[errorIndex]}</strong>
            </div>
          }
        </form>
        {isRegisterPending === true && <Loader />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isRegisterSuccess: state.registerReducer.isRegisterSuccess,
    isRegisterError: state.registerReducer.isRegisterError,
    isRegisterPending: state.registerReducer.isRegisterPending,
    loginErrorMessage: state.registerReducer.errorMessage
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    register: (email, password, userName, props) => register(email, password, userName, props)
  }, dispatch);
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);