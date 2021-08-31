import React, { Component } from 'react';
import './register.css';
import { 
    NavLink
} from "react-router-dom";



class Mess_display extends Component {

    constructor(props) {
        super(props);
        this.state = {


        }
    }

    render() {
        return (
            <div>
                <div id="signUpHead">

                    <div className="">
                        <div id="signUpHeadRow" className="row container">
                            {/* <h1>IN-D FS</h1> */}
                            <div className="mainLogo"></div>
                            <p>Already have an Account?<NavLink to="/Login"> Login -></NavLink> </p>
                        </div>
                    </div>

                </div>

                <div id="messDisplayBody" className="container row justify-content-center">
                    <div id="messageBody">
                        {/* <h4>Registered  Successfully!</h4>
                        <p>Please check your mail for the Activation Link !</p> */}
                        <h4>{this.props.location.state.mess1}</h4> 
                         <p>{this.props.location.state.mess2}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Mess_display;