import React, { Component } from 'react';
import './activate_customer.css';


class Mess_Act_Cust extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <div id="activationHead">
                    <div className="container">
                        {/* <h1>IN-D FS</h1> */}
                        <div className="mainLogo"></div>
                    </div>
                </div>

                <div id="activationBody" className="container row justify-content-center">
                    <div id="messageBody">
                        {/* <h4>Registered</h4>
                        <p>Check your mail</p> */}
                        <h4>{this.props.location.state.mess1}</h4>
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default Mess_Act_Cust;