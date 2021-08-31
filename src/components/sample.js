import React, { Component } from 'react';

import axios from 'axios';

import { BrowserRouter as
    Router,
    Route,
    Redirect,
    Switch,
    NavLink
} from "react-router-dom";




export default class Sample extends Component {

    constructor (props) {
        super(props);

        this.state = {
            orderid : "",
            redirect: false,
        }
        
        this.order = this.order.bind(this);
    } 

    order = (e) => {
        e.preventDefault();
        axios('http://0.0.0.0:5005/get_orderid', {
            method: 'POST',
            // data: JSON.stringify(data2),
            headers: {
                // 'Authorization': `bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then(res => {
            
            if(res.status === 200){
                console.log(res.data.orderid);
            this.setState({orderid: res.data.orderid});
                this.setState({redirect: true});
            }
                
           
               })
    }

  
    render() {
        localStorage.removeItem('shift');
        if(this.state.redirect){
            return <Redirect to={{
                pathname: "/Payy",
                state: {orderid: this.state.orderid}
            }} /> 
        }

        return (
            <div className="rowww">
                <button onClick={this.order}>Proceed to checkout</button>
            </div>
        );

    }

}