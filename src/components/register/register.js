import React, { Component } from 'react';

import './register.css';

import ReactPhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { BrowserRouter as Redirect, NavLink } from 'react-router-dom';

import axios from 'axios';
//import image from "../../images/IN-D-Logo.png"
import image from '../../images/IN-D-FS-LogoSignuppage.png';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      fname: '',
      lname: '',
      email: '',
      password: '',
      // phone: "",
      company: '',
      companyType: '',
      industry: '',
      noOfTrans: '',
      regType: '',
      mess1: '',
      mess2: '',
      redirect: false,
    };

    this.handleFirstnameChange = this.handleFirstnameChange.bind(this);
    this.handleLastnameChange = this.handleLastnameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleCompanyChange = this.handleCompanyChange.bind(this);
    this.handleCompanyTypeChange = this.handleCompanyTypeChange.bind(this);
    this.handleIndustryChange = this.handleIndustryChange.bind(this);
    this.handleNoOfTransChange = this.handleNoOfTransChange.bind(this);
    this.handleRegTypeChange = this.handleRegTypeChange.bind(this);

    this.onSignUp = this.onSignUp.bind(this);
  }

  handleFirstnameChange = (e) => {
    this.setState({ fname: e.target.value });
  };

  handleLastnameChange = (e) => {
    this.setState({ lname: e.target.value });
  };

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  handleCompanyChange = (e) => {
    this.setState({ company: e.target.value });
  };

  handleCompanyTypeChange = (e) => {
    this.setState({ companyType: e.target.value });
  };

  handleIndustryChange = (e) => {
    this.setState({ industry: e.target.value });
  };

  handleNoOfTransChange = (e) => {
    this.setState({ noOfTrans: e.target.value });
  };

  handleRegTypeChange = (e) => {
    this.setState({ regType: e.target.value });
  };

  onSignUp = (event) => {
    // console.log(this.state.fname);
    event.preventDefault();

    const data = {
      firstName: this.state.fname,
      lastName: this.state.lname,
      eMail: this.state.email,
      passWord: this.state.password,
      phoneNum: this.state.phone,
      companyName: this.state.company,
      typeOfCompany: this.state.companyType,
      industryType: this.state.industry,
      numOfTrans: this.state.noOfTrans,
      registrationType: this.state.regType,
    };
    // console.log(data);
    axios(process.env.REACT_APP_FS_API_URL + 'register_customer', {
      method: 'POST',
      data: JSON.stringify(data),
      headers: {
        // 'Authorization': `bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log(res.data.message);
        // console.log(res.data);
        alert(res.data.message);
        if (res.status === 200) {
          this.setState({
            mess1: res.data.message,
            mess2: 'Please check your mail for the Activation Link',
            redirect: true,
          });
        } else {
          // this.setState ({mess1: res.data.message, mess2: "", redirect: true});
        }
      })
      .catch((error) => alert(error));
  };

  handleOnChange = (value) => {
    this.setState({ phone: value });
  };

  render() {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: '/Display',
            state: { mess1: this.state.mess1, mess2: this.state.mess2 },
          }}
        />
      );
    }

    return (
      <div className='signUpMain'>
        <div id='signUpHead'>
          <div className=''>
            <div id='signUpHeadRow' className='row container'>
              {/* <h1>IN-D FS</h1> */}
              <img src={image} alt='image' className='externalimage' />
              <p>
                Already have an Account?<NavLink to='/Login'> Login -></NavLink>{' '}
              </p>
            </div>
          </div>
        </div>

        <div id='signUpBody' className='container row justify-content-center'>
          <div className='row justify-content-center'>
            <div id='signUpForm'>
              <h1>Try IN-D</h1>

              <form onSubmit={this.onSignUp}>
                <div className='row'>
                  <div id='space'>
                    <label id='name'>First Name</label>
                    <input
                      name='fname'
                      onChange={this.handleFirstnameChange}
                      className='textInputforName'
                      type='text'
                      placeholder=''
                      size='50'
                      required
                    />
                  </div>

                  <div id='space'>
                    <label id='name'>Last Name</label>
                    <input
                      name='lname'
                      onChange={this.handleLastnameChange}
                      className='textInputforName'
                      type='text'
                      placeholder=''
                      size='50'
                      required
                    />
                  </div>
                </div>

                <label id='name'>Work Email</label>
                <input
                  name='email'
                  onChange={this.handleEmailChange}
                  className='textInput'
                  type='text'
                  placeholder=''
                  size='50'
                  required
                />

                <div id='pass' className='row'>
                  <label>Set Password</label>
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
                    required
                  />
                </div>

                {/* <label id="name">Phone Number</label>
                                <input className="textInput" type="text" placeholder=""  size="50" required /> */}
                <div id='phoneNum'>
                  <label id='name'>Phone Number</label>

                  <ReactPhoneInput
                    inputExtraProps={{
                      name: 'phone',
                      required: true,
                    }}
                    defaultCountry={'in'}
                    value={this.state.phone}
                    onChange={this.handleOnChange}
                    style={{ width: '550' }}
                    inputClass='phoneInp'
                    dropdownClass='numDrop'
                  />
                </div>

                <label id='name'>Company</label>
                <input
                  name='company'
                  onChange={this.handleCompanyChange}
                  className='textInput'
                  type='text'
                  placeholder=''
                  size='50'
                  required
                />

                <label id='name'>Company Type</label>
                <select
                  name='companyType'
                  onChange={this.handleCompanyTypeChange}
                  className='textInput'
                  required
                >
                  <option selected disabled>
                    - Please Select -
                  </option>
                  <option value='In-house Developer'>In-house Developer</option>
                  <option value='Start-up'>Start-up</option>
                  <option value='Software Development Firm'>
                    Software Development Firm
                  </option>
                  <option value='Freelancer'>Freelancer</option>
                  <option value='Other'>Other</option>
                </select>

                <label id='name'>Industry</label>
                <select
                  name='industry'
                  onChange={this.handleIndustryChange}
                  className='textInput'
                  required
                >
                  <option selected disabled>
                    - Please Select -
                  </option>
                  <option value='Automotive'>Automotive</option>
                  <option value='Financial'>Financial</option>
                  <option value='Gaming'>Gaming</option>
                  <option value='Government'>Government</option>
                  <option value='Hospitality'>Hospitality</option>
                  <option value='Healthcare'>Healthcare</option>
                  <option value='Human Resources'>Human Resources</option>
                  <option value='Reseller'>Reseller</option>
                  <option value='Mobile App/Developers'>
                    Mobile App/Developers
                  </option>
                  <option value='Retail'>Retail</option>
                  <option value='Security'>Security</option>
                  <option value='Travel'>Travel</option>
                  <option value='Other'>Other</option>
                </select>

                <label id='name'>
                  Expected number of Transactions per month
                </label>
                <select
                  name='noOfTrans'
                  onChange={this.handleNoOfTransChange}
                  className='textInput'
                  required
                >
                  <option selected disabled>
                    - Please Select -
                  </option>
                  <option value='less than 1,000'>less than 1,000</option>
                  <option value='1,000 - 5,000'>1,000 - 5,000</option>
                  <option value='5,000 - 10,000'>5,000 - 10,000</option>
                  <option value='more than 10,000'>more than 10,000</option>
                </select>

                <label id='name'>Registration Type</label>
                <input
                  name='regType'
                  value='Express'
                  onChange={this.handleRegTypeChange}
                  className='textInput'
                  type='text'
                  placeholder=''
                  size='50'
                  disabled
                />

                <div
                  id='recaptcha'
                  className='g-recaptcha'
                  data-sitekey='6Ld4Jh8TAAAAAD2tURa21kTFwMkKoyJCqaXb0uoK'
                ></div>

                <div id='privacyNote'>
                  <p>
                    By clicking below, you agree to our terms and acknowledge
                    reading our <a href='#/'>privacy notice.</a>
                  </p>
                </div>

                <button type='submit' id='signUpButton'>
                  Sign up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
