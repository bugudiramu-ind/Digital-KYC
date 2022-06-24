import React, { Component } from 'react';
import './login.css';
import axios from 'axios';
import { Redirect, NavLink } from 'react-router-dom';
import image from '../../images/IN-D-FS-LogoSignuppage.png';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uname: '',
      password: '',
      email: '',
      crct_password: '',
      custKey: '',
      custid: '',
      userType: '',
      warn_msg: '',
      redirect: false,
      payredirect: false,
      logredirect: false,
      accessToken: '',
      refreshToken: '',
    };

    this.routeChange = this.routeChange.bind(this);

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

    this.onSignIn = this.onSignIn.bind(this);

    // this.redirectCall = this.redirectCall.bind(this);
    // console.log(this.state.fs_url);
  }

  handleUsernameChange = (e) => {
    this.setState({ uname: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  routeChange() {
    let x = document.getElementById('eye-icon');
    x.classList.toggle('fa-eye-slash');

    if (document.getElementById('password-field').type === 'password') {
      document.getElementById('password-field').type = 'text';
    } else {
      document.getElementById('password-field').type = 'password';
    }
  }

  componentDidMount() {
    localStorage.clear();
  }

  onSignIn = (event) => {
    // console.log(this.state.fname);
    event.preventDefault();

    const data = {
      email: this.state.uname,
      password: this.state.password,
    };
    // console.log(data);
    axios(process.env.REACT_APP_FS_API_URL + 'users/token/', {
      method: 'POST',
      data: JSON.stringify(data),
      headers: {
        // 'Authorization': `bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log(res.data);

        if (res.status === 200) {
          this.setState({
            email: res.data.email,
            crct_password: res.data.password,
            custKey: res.data.cust_key,
            userType: res.data.user_type,
            custid: res.data.custid,
            warn_msg: res.data.warn_msg,
            accessToken: res.data.access,
            refreshToken: res.data.refresh,
          });

          localStorage.setItem('emailid', this.state.email);
          localStorage.setItem('password', this.state.crct_password);
          //   localStorage.setItem("cust_key", this.state.custKey);
          //   localStorage.setItem("user_type", this.state.userType);
          //   localStorage.setItem("custid", this.state.custid);
          localStorage.setItem('access', this.state.accessToken);
          localStorage.setItem('refresh', this.state.refreshToken);

          if (this.state.warn_msg === 'yes') {
            alert('Please update your payment');
          }

          this.setState({ redirect: true });
        } else {
          this.setState({
            custKey: res.data.custkey,
          });
          localStorage.setItem('cust_key', this.state.custKey);
          alert(res.data.message);
          if (res.data.message === 'Email ID or Password Missing!') {
            window.location.assign('/Login');
          } else if (res.data.message === 'Incorrect Details!') {
            // this.setState ({logredirect: true});
            window.location.assign('/Login');
          } else if (res.data.message === 'Customer Inactive!') {
            window.location.assign('/Login');
          } else if (
            res.data.message === 'Free Trial Expired...please pay to renew!'
          ) {
            this.setState({ payredirect: true });
          } else if (
            res.data.message === 'Subscription Expired...please pay to renew!'
          ) {
            this.setState({ payredirect: true });
          } else if (
            res.data.message ===
            'Document Limit Exceeded...Please pay to renew!'
          ) {
            this.setState({ payredirect: true });
          } else if (
            res.data.message ===
            'Subscription Expired...Please contact your admin to renew subscription'
          ) {
            window.location.assign('/Login');
          }
        }
      })
      .catch((error) => alert(error));
  };
  render() {
    console.log(this.state.accessToken);
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: '/UploadDoc',
          }}
        />
      );
    } else if (this.state.payredirect) {
      return (
        <Redirect
          to={{
            pathname: '/Plans_Billing',
          }}
        />
      );
    }

    return (
      <div className='loginMain'>
        <div id='loginHead'>
          <div className='container'>
            {/* <h1>IN-D FS</h1> */}

            <img src={image} alt='image' className='externalimage' />
          </div>
        </div>
        <div id='loginBody' className='container row justify-content-center'>
          <div className='row justify-content-center'>
            <div id='loginForm'>
              <h5>Log in to your account to access IN-D FS</h5>

              <form onSubmit={this.onSignIn}>
                <label id='name'>User Name</label>
                <input
                  name='uname'
                  onChange={this.handleUsernameChange}
                  className='textInput'
                  type='text'
                  placeholder=''
                  size='50'
                />

                <div id='pass' className='row'>
                  <label>Password</label>
                  <a onClick={(e) => e.preventDefault()}>Forgot Password?</a>
                </div>
                <div>
                  <input
                    name='password'
                    onChange={this.handlePasswordChange}
                    className='textInput'
                    type='password'
                    placeholder=''
                    id='password-field'
                    size='50'
                  />
                  <span
                    id='eye-icon'
                    toggle='#password-field'
                    className='fa fa-lg fa-fw fa-eye field-icon toggle-password'
                    onClick={this.routeChange}
                  ></span>
                </div>

                <button type='submit' id='signInButton'>
                  Sign In
                </button>

                <div id='checkBox'>
                  <input className='checkInput' type='checkbox' /> Keep me
                  signed in
                </div>
              </form>

              <div id='newFull' className='row'>
                {' '}
                <hr />
                <div id='new'>New to IN-D ?</div>
                <hr />{' '}
              </div>

              <NavLink to='/Register' style={{ textDecoration: 'none' }}>
                <button id='createButton'>Create your IN-D Account</button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
