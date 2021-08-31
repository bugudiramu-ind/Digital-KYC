import React, { Component } from 'react';
import $ from 'jquery';
import './Sidenav.css';

import { Link } from "react-router-dom";
import Tooltip from '@material-ui/core/Tooltip';
// import Modal from 'react-responsive-modal';
import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";



class Sidenav extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        }

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);

        this.logout = this.logout.bind(this);
        
       
    }
      close() {
        this.setState({ showModal: false  });
      }
    
      open() {
        this.setState({ showModal: true });
      }
    // handleButtonClick = () => {
    //     this.setState(state => {
    //         return {
    //             open: !state.open,

    //         };
    //     });
    // };

    componentDidMount() {

        // $('#sidebar').toggleClass('activexyz');

        $('#sidebarCollapse').on('click', function () {
            $('#sidebar').toggleClass('activexyz');
            $('.wrapper').toggleClass('activexyz');
        });

        if(localStorage.getItem('user_type') === 'User'){
            console.log("yess");
            $('#set').toggleClass('noDisp');
        }


    }


    logout() {
        localStorage.clear();
        window.location.href = '/Login';
    }

    colorStay = (idName) => {
        console.log(idName);
        idName = "#"+idName;
        console.log(idName);
        $(idName).addClass('backColor');

    }
    

    

    render() {
        



     
        return (
            <div className="">

                <nav id="sidebar" >

                    <ul id="sideNavTop" className="list-unstyled components">
                    
                            <li id="logoLi">
                                
                                    <div id="" >
                                        <div className="activexyz logo" >
                                        </div>
                                    </div>
                               
                            </li>
                       

                        <Tooltip title="Dashboard" placement="right">
                            <li>
                                <Link to="/Dashboard" style={{ textDecoration: 'none' }}>
                                    <div id="sideElements1" className="" onClick={this.colorStay.bind(this, "sideElements1")}>
                                        <div className="activexyz Dashboard" >
                                            <p> Dashboard </p>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        </Tooltip>


                        <Tooltip title="Upload Documents" placement="right">
                            <li>
                                <Link to="/UploadDoc" style={{ textDecoration: 'none' }}>
                                    <div id="sideElements2" className="" onClick={this.colorStay.bind(this, "sideElements2")}>
                                        <div className="activexyz Documents" >
                                            <p>Upload Documents</p>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        </Tooltip>


                        <Tooltip title="Settings" placement="right">
                            <li id="set" className="">
                                <Link to="/Settings" style={{ textDecoration: 'none' }}>
                                    <div id="sideElements3" className="" onClick={this.colorStay.bind(this, "sideElements3")}>
                                        <div className="activexyz Settings" >
                                            <p> Settings </p>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        </Tooltip>


                    </ul>


                    <ul id="sideNavBottom" className="list-unstyled components">

                        <Tooltip title="Information" placement="right">
                            <li>
                                <div id="sideElements4" className="" onClick={this.colorStay.bind(this, "sideElements4")}>
                                    <div className="activexyz Information" >
                                        <p> Information </p>
                                    </div>
                                </div>
                            </li>
                        </Tooltip>

                        <Tooltip id="tool" title="Logout" placement="right">
                            <li>
                                <div id="sideElements" onClick={this.open}>
                                    <div className="activexyz Logout">
                                        <p> Logout </p>
                                    </div>
                                    
                                </div>
                                <Modal show={this.state.showModal} onHide={this.close}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Are you sure you want to logout?</Modal.Title>
                                        </Modal.Header>
                                    <Modal.Body className="row  justify-content-center" >
                                            <Button id="logoutButton" onClick={this.logout}>Yes</Button>
                                            <Button id="logoutButton" onClick={this.close}>No</Button>
                                        
                                    </Modal.Body>
                                    </Modal>
                            </li>
                        </Tooltip>

                        <div id="collapseIcon">
                            <div id="sidebarCollapse" className="sidebar-header">
                                <div className="activexyz openIcon">>
                                    
                                </div>
                            </div>
                        </div>

                    </ul>

                </nav>

            </div>

        );

    }
}

export default Sidenav;