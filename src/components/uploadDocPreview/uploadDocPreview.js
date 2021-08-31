import React, { Component } from "react";

import axios from "axios";

import "./uploadDocPreview.css";
import { Redirect, Link } from "react-router-dom";
import $ from "jquery";
import "../Sidenav/Sidenav.css";
import LoadingOverlay from "react-loading-overlay";
import SideMenu from "../Sidenav/Sidenav";
import Tooltip from "@material-ui/core/Tooltip";
import Modal from "react-bootstrap/Modal";
import { Button, Navbar } from "react-bootstrap";
import { KYC_SIT,PATH } from "../../constants";

class UploadDocPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classify_res: null,
      folder_name: "",
      attributes: "",
      redirect: false,
      showModal: false,
      cvCheck: false,
      fmCheck: false,
      cvResult: [],
      fmResult: [],
      isActive: false,
      localfiles: [],
    };

    this.digitize = this.digitize.bind(this);
    this.card_display = this.card_display.bind(this);

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);

    this.logout = this.logout.bind(this);

    // Deprecated.
    // this.handleChecked = this.handleChecked.bind(this);
    // this.handleChecked1 = this.handleChecked1.bind(this);
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  logout() {
    localStorage.clear();
    window.location.href = "/Login";
  }

  componentDidMount = () => {
    $("#sidebar").toggleClass("activexyz");

    $("#collapseIcon").on("click", function () {
      $("#sidebar").toggleClass("activexyz");
      $(".wrapper").toggleClass("activexyz");
    });

    if (localStorage.getItem("user_type") === "User") {
      console.log("yess");
      $("#set").toggleClass("noDisp");
    }

    // console.log(this.props.location.state.ui_response);
    this.setState({ classify_res: this.props.location.state.ui_response });
    this.setState({ folder_name: this.props.location.state.folder_name });
    const localfiles = JSON.parse(localStorage.getItem("itemsArray"));
    this.setState({ localfiles: localfiles });

    // console.log(this.state.response_arr[1][1]);
  };

  card_display() {
    let cards = [],
      arr_response = this.state.classify_res;
    // var len = Object.keys(arr_response).length;

    for (var i in arr_response) {
      console.log("___" + JSON.stringify(arr_response[i]));
      // console.log("filename" + i);
      cards.push(
        <div id="imageBox" key={i}>
          <div className="row justify-content-center">
            <img
              id="imgPan"
              // src={`data:image/jpg/jpeg/png;base64,${arr_response[i].image_file}`}
              alt={arr_response[i].filename}
            />
          </div>
          <div id="bottomBoxDiv" className="">
            <div className="row">
              <h6>{arr_response[i].document_type}</h6>
            </div>
            <div className="flex">
              <div className="row">
                <h6>{arr_response[i].filename}</h6>
              </div>
              <div className="quality">
                <h6>{arr_response[i].image_quality}</h6>
              </div>
            </div>
          </div>
        </div>
      );
    }
    console.log(cards);
    return cards;
  }

  /* Deprecated.

    handleChecked () {
        this.setState({cvCheck: !this.state.cvCheck});
      }

      handleChecked1 () {
        this.setState({fmCheck: !this.state.fmCheck});
      }

    */

  digitize = () => {
    this.setState({ isActive: true });

    localStorage.setItem("cross_validation", this.state.cvCheck);
    localStorage.setItem("face_match", this.state.fmCheck);

    const data = {
      email_id: localStorage.getItem("emailid"),
      cust_key: localStorage.getItem("cust_key"),
      password: localStorage.getItem("password"),
      uidToken: localStorage.getItem("uidtoken"),
      accessToken: localStorage.getItem("access"),
      foldername: this.state.folder_name,
      cross_validation: this.state.cvCheck,
      face_match: this.state.fmCheck,
    };
    console.log(data);
    axios(`${KYC_SIT}${PATH.extraction}${data.uidToken}`, {
    // axios(`https://vkyc.in-d.ai/api/fields/${data.uidToken}`, {
      method: "POST",
      data: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${data.accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res.data);
        // console.log(res.data);
        if (res.status === 200) {
          this.setState({
            attributes: res.data.result,
            cvResult: res.data.cross_validation_res,
            fmResult: res.data.face_match_res,
          });
          this.setState({ redirect: true });
        } else {
          this.setState({ isActive: false });
        }
      })
      .catch((error) => {
        alert(error);
        this.setState({ isActive: false });
      });
  };

  render() {
    console.log(this.state.attributes);
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: "/Document_Digitized",
            state: {
              foldername: this.state.folder_name,
              attributes: this.state.attributes,
              prev_res: this.state.classify_res,
              cvResult: this.state.cvResult,
              fmResult: this.state.fmResult,
            },
          }}
        />
      );
    }

    return (
      <div className="App">
        <SideMenu />
        <div className="wrapper">
          <div className="uploadDocPreviewMain">
            <Navbar
              id="uploadDocPreviewHead"
              className="container"
              sticky="top"
            >
              <h6>Upload Documents</h6>
            </Navbar>
            <LoadingOverlay
              active={this.state.isActive}
              spinner
              text="Digitizing..."
            >
              <div
                id="uploadDocPreviewBody"
                className="container row justify-content-center"
              >
                <div id="outerDiv4">
                  <div id="uploadDocPreviewForm">
                    <div className="row">
                      {this.state.classify_res !== null
                        ? this.state.classify_res.map((item) => (
                            <div id="imageBox" key={item.filename}>
                              <div className="row justify-content-center">
                                {this.state.localfiles.map(
                                  (localfiles_item) => (
                                    <React.Fragment>
                                      {Object.entries(localfiles_item).map(
                                        ([key, value]) => (
                                          <React.Fragment>
                                            {item.filename == key ? (
                                              <img
                                                id="imgPan"
                                                src={value}
                                                alt={item.filename}
                                              />
                                            ) : (
                                              ""
                                            )}
                                          </React.Fragment>
                                        )
                                      )}
                                    </React.Fragment>
                                  )
                                )}
                              </div>
                              <div id="bottomBoxDiv" className="">
                                <div className="row">
                                  <div className="col-md-12">
                                    <h6>{item.document_type}</h6>
                                    <p>{item.filename}</p>
                                    <p>{item.image_quality}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        : ""}
                    </div>
                  </div>

                  <div id="horizontalLine">
                    <hr />
                  </div>

                  <div className="row">
                    {/* Deprecated.
                                    
                                    <div id="leftAlignDiv">
                                        
                                        <label><input id="c_v"  type="checkbox" name="cross_validation" value="cross_validation" onChange={ this.handleChecked }></input> <span> Cross Validation </span></label><br />
                                        <label><input id="f_m" type="checkbox" name="face_match" value="face_match" onChange={ this.handleChecked1 }></input><span> Face Match</span></label>
                                    </div> */}

                    <div id="rightAlignButtonDiv">
                      <div className="row">
                        <Link to="/UploadDoc">
                          <button id="bottomButton">Cancel</button>{" "}
                        </Link>
                        <button id="bottomButton" onClick={this.digitize}>
                          Digitize
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </LoadingOverlay>
          </div>
        </div>
      </div>
    );
  }
}

export default UploadDocPreview;
