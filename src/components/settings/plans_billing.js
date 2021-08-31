import React, { Component } from 'react';

import axios from 'axios';

import {
    Redirect
} from "react-router-dom";
import JSONData from '../../json/data.json';

import $ from 'jquery';
import '../Sidenav/Sidenav.css';

import { Link } from "react-router-dom";
import SideMenu from "../Sidenav/Sidenav"
import { Button } from "react-bootstrap";




export default class Sample extends Component {

    constructor(props) {
        super(props);

        this.state = {
            orderid: "",
            redirect: false,
            Cdate: "",
            Edate: "",
            Rdocuments: "",
            Rtype: "",
            Rdays: "",
            mess: "",
            showModal: false
        }

        this.order = this.order.bind(this);

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);

        this.logout = this.logout.bind(this);
    }

    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }

    logout() {
        localStorage.clear();
        window.location.href = '/Login';
    }

    componentDidMount() {

        $('#sidebar').toggleClass('activexyz');

        $('#collapseIcon').on('click', function () {
            $('#sidebar').toggleClass('activexyz');
            $('.wrapper').toggleClass('activexyz');
        });

        if (localStorage.getItem('user_type') === 'User') {
            console.log("yess");
            $('#set').toggleClass('noDisp');
        }


        const data = {
            "custkey": localStorage.getItem('cust_key')
        }

        axios(JSONData.fs_api_url + '/usage_stats', {
            method: 'POST',
            data: JSON.stringify(data),
            headers: {
                // 'Authorization': `bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log("result:", res.data.result);

            if (res.status === 200) {
                this.setState({
                    Cdate: res.data.result.creation_date,
                    Edate: res.data.result.expiry_date,
                    Rdocuments: res.data.result.rem_documents,
                    Rtype: res.data.result.registrationType,
                    Rdays: res.data.result.rem_days,
                })

                if(this.state.Rtype === "Free"){
                    this.setState({
                        mess: "free trial"
                    })
                }
                else {
                    this.setState({
                        mess: "plan"
                    })
                }
            }
            
        })
    }

    order = (e) => {
        e.preventDefault();
        axios(JSONData.fs_api_url + '/get_orderid', {
            method: 'POST',
            // data: JSON.stringify(data2),
            headers: {
                // 'Authorization': `bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then(res => {

            if (res.status === 200) {
                console.log(res.data.orderid);


                this.setState({ orderid: res.data.orderid });
                this.setState({ redirect: true });


            }


        })
    }


    render() {
        // localStorage.removeItem('shift');
        if (this.state.redirect) {
            return <Redirect to={{
                pathname: "/Payy",
                state: { orderid: this.state.orderid }
            }} />
        }

        return (

            <div className="App">
                <SideMenu />
                <div className="wrapper">
                    <div className="settingsMain">
                        <div id="settingsHead">

                            <div className="container">
                                <div id="heading" className="row">
                                    <h6>Settings</h6>
                                </div>
                            </div>
                            <hr id="hor_Set">

                            </hr>
                            <div id="upperNavContainer" className="container">
                                <div id="upperNavBar" className="row justify-content-left">
                                    <Link to="/Settings"> <a  href='#/' id="hov" className="">
                                        Users
                                    </a></Link>

                                    <Link to="/Plans_Billing"><a href='#/' id="hov" className="activeNav">
                                        Plans and Billing
                                    </a></Link>
                                    {/* <div id="updatePayment">
                                        <button type="submit" id="paymentButton">Update Payment</button>
                                    </div> */}
                                </div>

                            </div>
                            <hr id="hor_Set">

                            </hr>

                        </div>
                        <div id="settingsBody" className="container row">
                            <div id="plansWhite">
                                <div id="plansRed" className="row justify-content-center">
                                    <p>Your {this.state.mess} expires in {this.state.Rdays} days.
                                        To continue using IN-D FS, please click proceed
                                        to payment in the plan below.</p>
                                </div>

                                <div id="plansBlue" className="row">
                                    <div id="plansBlueD" className="col-3">
                                        <h6>Your Current Plan</h6>
                                        <h5>{this.state.Rtype}</h5>
                                    </div>
                                    <div id="plansData" className="col-3">
                                        <p>Documents Remaining</p>
                                        <h6>{this.state.Rdocuments}</h6>
                                    </div>
                                    <div id="plansData" className="col-3">
                                        <p>Trial Period expires on</p>
                                        <h6>{this.state.Edate}</h6>
                                    </div>
                                    <div id="plansData" className="col-3">
                                        <p>Account created on</p>
                                        <h6>{this.state.Cdate}</h6>
                                    </div>
                                </div>

                                <div id="onboardFull" className="container fullscreen justify-content-center align-items-center">
                                    <p className="font-weight-bold" id="title1">Plans and Pricing</p>
                                    <div className="big-container">

                                        <div className="small-container">


                                            <div id="head">
                                                <div className="header">
                                                    <h3 className="">Express</h3>
                                                </div>

                                                <div className="content">
                                                    <p><sup><span id="span-1">&#8377;</span></sup> 25,000</p>
                                                    <p id="light">/Month(Upto 10,000 Documents)</p>
                                                </div>
                                                <hr className="line" />
                                            </div>


                                            <div className="data">

                                                <p>&#10003; <b>30-Day Free Trail</b> upto 5000 documents</p>
                                                <p>&#10003; Limited document types</p>
                                                <ul id="list-tag">
                                                    <li>Aadhaar</li>
                                                    <li>PAN</li>
                                                    <li>VoterID</li>
                                                    <li>Driving License</li>
                                                    <li>Passport</li>
                                                </ul>
                                            </div>


                                            <div className="card-btn">
                                                <button id="ptp" type="button" onClick={this.order} className="btn btn-default btn-block"><b>Proceed to payment</b></button>
                                            </div>
                                        </div>

                                        <div class="small-container">

                                            <div id="head">
                                                <div className="header">
                                                    <h3 className="">Enterprise</h3>
                                                </div>
                                                <div className="content black-bgc">
                                                    <p id="hlight">Custom plans for</p>
                                                    <p id="hlight">large enterprises</p>
                                                </div>
                                                <hr className="line blackline" />
                                            </div>

                                            <div className="data">
                                                <p>&#10003; API based</p>
                                                <p>&#10003; Full Integration Support</p>
                                                <p>&#10003; Documents Added on Request*</p>
                                                <p>&#10003; Customized Workflow</p>
                                                <p>&#10003; Feature Extraction</p>
                                                <p>&#10003; UAT Support</p>

                                            </div>


                                            <div className="card-btn1">
                                                <button id="gq" type="button" className="btn btn-default btn-block"><b>Get Quote</b></button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>


                    </div>
                </div>
            </div>
        );

    }

}