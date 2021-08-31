import React, { Component } from 'react';

import './inviteUser.css';


import axios from 'axios';

import queryString from 'query-string';

import { BrowserRouter as
    Redirect
} from "react-router-dom";
import JSONData from '../../json/data.json';

class InviteUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: "",
            emailid: "",
            custid: "",
            key: "",
            redirect : false
        };
        this.routeChange = this.routeChange.bind(this);

        this.handlePasswordChange = this.handlePasswordChange.bind(this);

        this.onSignUp = this.onSignUp.bind(this);
        
    }

    componentDidMount=()=>{ 
        
        var query = window.location.search;
        var params = queryString.parse(query);
        this.setState({ emailid: params.emailid });
        this.setState({ custid: params.custid });
        this.setState({ key: params.key });

        console.log(params.custid);
        console.log(params.key);
        console.log(params.emailid);

       // console.log(this.props.location.state.mail);
    }

    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
    }

    onSignUp = event => {
        event.preventDefault();
        //http://0.0.0.0:5012/activate_customer?emailid=anand.k@intainft.com&custid=Intainft&key=029e129e-4072-41bd-ba86-696b49fb11be

        axios(JSONData.fs_api_url+'/activate_user?custid='+this.state.custid+'&password='+this.state.password+'&emailid='+this.state.emailid+'&key='+this.state.key , {
            method: 'GET'
        }).then(res => {
            console.log(res.data.message);
            
            alert(res.data.message);
            this.setState({ redirect:true});
            
        }).catch(error => alert(error))
    }

    routeChange() {
        let x = document.getElementById('eye-icon');
        x.classList.toggle("fa-eye-slash");

        if (document.getElementById('password-field').type === 'password') {
            document.getElementById('password-field').type = 'text';
        }
        else {
            document.getElementById('password-field').type = 'password';
        }

    }

    render() {
        if(this.state.redirect){
            return <Redirect to={{
                pathname: "/Login",
                // state :{mess1: this.state.mess1}
            }} />
        }
 
        return (
            <div className="inviteUserMain">
                <div id="inviteUserHead">
                    <div className="container">
                        {/* <h1>IN-D FS</h1> */}
                        <div className="mainLogo"></div>
                    </div>
                </div>
                <div id="inviteUserBody" className="container row justify-content-center">

                    <div className="row justify-content-center">
                        <div id="inviteUserForm">
                            <h1>Create a IN-D Account</h1>
                            <p>Hi User, you're one step away</p>

                            <form onSubmit={this.onSignUp}>
                                <label id="name">User Name</label>
                                <input value={this.state.emailid} className="textInput" type="text" placeholder="" size="50" required disabled />

                                <div id="pass" className="row">
                                    <label>Set Password</label>
                                    
                                </div>
                                <div>
                                    <input className="textInput" onChange={this.handlePasswordChange} type="password" placeholder="" id="password-field" size="50" required />
                                    <span id="eye-icon" toggle="#password-field" className="fa fa-lg fa-fw fa-eye field-icon toggle-password" onClick={this.routeChange}></span>
                                </div>
                                <div id="privacyNote">
                                    <p>By clicking below, you agree to our terms and acknowledge reading our <a href='#/'>privacy notice.</a></p>
                                </div>

                                <button type="submit" id="createAccountButton">Create Account</button>

                                
                            </form>

      
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}

export default InviteUser;