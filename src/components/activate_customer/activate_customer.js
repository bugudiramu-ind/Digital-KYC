import React, { Component } from 'react';

import axios from 'axios';

import queryString from 'query-string';

import './activate_customer.css';

import { BrowserRouter as
    Redirect
} from "react-router-dom";
import JSONData from '../../json/data.json';

class ActivateCustomer extends Component {

    // custId = this.props.params.custid;
    // cust_Key = this.props.params.cust_key;
    // emailId = this.props.params.emailid;
        
    constructor (props) {
        super(props);
        this.state = {
            mess1 :"",
            redirect: false
        }
    }


    componentDidMount=()=>{   

        // url -- /?custid=123&key=111&emailid=poojaa@gmail.com
        //http://0.0.0.0:5012/activate_customer?emailid=poojaa.krishnamoorthy@intainft.com&custid=Intainft&key=029e129e-4072-41bd-ba86-696b49fb11be
        // http://0.0.0.0:5012/activate_customer?emailid=poojaa.krishnamoorthy@intainft.com&custid=Intainft&key=46e1ba90-1dba-450c-b983-b822f2147d9d
        // http://0.0.0.0:5012/activate_customer?emailid=poojaa.krishnamoorthy@intainft.com&custid=Intainft&key=c18feac3-84a2-490f-8357-d0da5da187f5
        var query = window.location.search;
        let params = queryString.parse(query);

        console.log(params.custid);
        console.log(params.key);
        console.log(params.emailid);

       
            
        
        axios(JSONData.fs_api_url+'/activate_customer?custid='+params.custid+'&key='+params.key+'&emailid='+params.emailid , {
            method: 'GET'
        }).then(res => {
            console.log(res.data.message);
            // console.log(res.data);
            alert(res.data.message);
            if(res.status === 200){
                this.setState ({mess1: res.data.message, redirect: true});
            }
            else {
                this.setState ({mess1: res.data.message, redirect: true});
            }
        })
    }

    render() {
        if(this.state.redirect){
            return <Redirect to={{
                pathname: "/Login",
                // state :{mess1: this.state.mess1}
            }} />
        }
        
        return (
            <div className="activationMain">
                <div id="activationHead">
                    <div className="container">
                        {/* <h1>IN-D FS</h1> */}
                        <div className="mainLogo"></div>
                    </div>
                </div>
                <div id="activationBody" className="container row justify-content-center">

                    <div className="row justify-content-center">
                        
                    </div>

                </div>

            </div>
        );
    }
}

export default ActivateCustomer;