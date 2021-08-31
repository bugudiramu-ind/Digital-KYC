import React, { Component } from "react";
import "./profile.css";
import { Link, Redirect } from "react-router-dom";
import $ from "jquery";
import "../Sidenav/Sidenav.css";
import SideMenu from "../Sidenav/Sidenav";
import axios from "axios";
import { Button } from "react-bootstrap";
import FMGrid from "../FMGrid/FMGrid";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import LoadingOverlay from "react-loading-overlay";
import { KYC_SIT,PATH } from "../../constants";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      classify_res: "",
      folder_name: "",
      attributes: "",
      redirect: false,
      showModal: false,
      redirect_back: false,
      user_data: [],
      value: 0,
      profile: "",
      isActive: true,
      cross_validation: "",
      govt_data: "",
    };

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.redirect_back_fn = this.redirect_back_fn.bind(this);
    this.logout = this.logout.bind(this);
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };

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

  redirect_back_fn() {
    this.setState({ redirect_back: true });
  }

  componentDidMount = () => {
    const data = {
      uidToken: localStorage.getItem("uidtoken"),
      accessToken: localStorage.getItem("access"),
    };
    axios(`${KYC_SIT}${PATH.profile}${data.uidToken}`, {
    // axios(`https://vkyc.in-d.ai/api/profile/kyc/${data.uidToken}`, {
      method: "POST",
      data: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${data.accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res.data);
        const response_data = res.data.result;
        this.setState({
          user_data: response_data,
          isActive: false,
        });
      })
      .then((err) => {
        console.log(err);
      });
    $("#sidebar").toggleClass("activexyz");
    if (localStorage.getItem("user_type") === "User") {
      console.log("yess");
      $("#set").toggleClass("noDisp");
    }

    this.setState({ profile: this.props.location.state.profile });
    this.setState({
      cross_validation: this.props.location.state.profile.result
        .cross_validation,
    });
    axios(`${KYC_SIT}${PATH.validation}${data.uidToken}`, {
    // axios(`https://vkyc.in-d.ai/api/validation/${data.uidToken}`, {
      method: "POST",
      // data: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${data.accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        this.setState({ govt_data: res.data.result });
      })
      .then((err) => {
        this.setState({ isActive: false });
        console.log("asdasd", err);
      });
  };

  render() {
    console.log(this.props.location.state.profileResult);
    const cross_data = this.state.cross_validation;
    // const cross_data=this.props.location.state.profileResult
    console.log(cross_data);
    console.log(this.state.govt_data);
    if (this.state.redirect_back) {
      return (
        <Redirect
          to={{
            pathname: "/Document_Digitized",
            state: this.props.location.state.prop_cache,
          }}
        />
      );
    }
    const maindata = [];
    console.log(maindata)
    return (
      <div className="App">
        <SideMenu />

        <div className="wrapper">
          <div className="PPMain">
            <div id="PPHead">
              <div className="material_ui_tabs">
                <div className="d-flex pl-2 pr-2 profile_tabs">
                  <Tabs value={this.state.value} onChange={this.handleChange}>
                    <Tab label="Profile" />
                  </Tabs>
                  <Button className="GOBack" onClick={this.redirect_back_fn}>
                    Go Back
                  </Button>
                </div>
                <div>
                  {this.state.value === 0 && (
                    <TabContainer>
                      <LoadingOverlay
                        active={this.state.isActive}
                        spinner
                        text="Profile Loading Please Wait..."
                      >
                        <div id="PPBody" className="container">
                          <div className="row justify-content-center">
                            <div id="outerDiv4">
                              <div id="PPForm">
                                <div className="profile">
                                  <div className="d-flex justify-content-between">
                                    <div className="col-md-7 d-flex">
                                      <h5 className="unsetDisplay">Name :</h5>
                                      <div className="profile_adjust_data">
                                        {this.state.user_data.NAME ? (
                                          this.state.user_data.NAME
                                        ) : (
                                          <div>NA</div>
                                        )}
                                      </div>
                                    </div>
                                    <div className="col-md-5 d-flex">
                                      <h5 className="unsetDisplay">PAN :</h5>
                                      {this.state.user_data.PAN ? (
                                        this.state.user_data.PAN
                                      ) : (
                                        <div>NA</div>
                                      )}
                                    </div>
                                  </div>
                                  <div className="d-flex justify-content-between">
                                    <div className="col-md-7 d-flex">
                                      <h5 className="unsetDisplay">
                                        Father/Spouse Name :
                                      </h5>
                                      <div className="profile_adjust_data">
                                        {this.state.user_data
                                          .FATHER_SPOUSE_NAME ? (
                                          this.state.user_data
                                            .FATHER_SPOUSE_NAME
                                        ) : (
                                          <div>NA</div>
                                        )}
                                      </div>
                                    </div>
                                    <div className="col-md-5 d-flex">
                                      <h5 className="unsetDisplay">
                                        Passport Number :
                                      </h5>
                                      {this.state.user_data[
                                        "PASSPORT_NUMBER"
                                      ] ? (
                                        this.state.user_data["PASSPORT_NUMBER"]
                                      ) : (
                                        <div>NA</div>
                                      )}
                                    </div>
                                  </div>

                                  <div className="d-flex justify-content-between">
                                    <div className="col-md-7 d-flex">
                                      <h5 className="unsetDisplay">
                                        Address :
                                      </h5>
                                      <div className="profile_adjust_data">
                                        {this.state.user_data["ADDRESS"] ? (
                                          this.state.user_data["ADDRESS"]
                                        ) : (
                                          <div>NA</div>
                                        )}
                                      </div>
                                    </div>
                                    <div className="col-md-5 d-flex">
                                      <h5 className="unsetDisplay">
                                        DL Number :
                                      </h5>
                                      {this.state.user_data[
                                        "DRIVING_LICENSE_NUMBER"
                                      ] ? (
                                        this.state.user_data[
                                          "DRIVING_LICENSE_NUMBER"
                                        ]
                                      ) : (
                                        <div>NA</div>
                                      )}
                                    </div>
                                  </div>
                                  <div className="d-flex justify-content-between">
                                    <div className="col-md-7 d-flex">
                                      <h5 className="unsetDisplay">
                                        Date of Birth :
                                      </h5>
                                      <div className="profile_adjust_data">
                                        {this.state.user_data.DATE_OF_BIRTH ? (
                                          this.state.user_data.DATE_OF_BIRTH
                                        ) : (
                                          <div>NA</div>
                                        )}
                                      </div>
                                    </div>
                                    <div className="col-md-5 d-flex">
                                      <h5 className="unsetDisplay">
                                        Voter ID Number :
                                      </h5>
                                      {this.state.user_data[
                                        "VOTER_ID_NUMBER"
                                      ] ? (
                                        this.state.user_data["VOTER_ID_NUMBER"]
                                      ) : (
                                        <div>NA</div>
                                      )}
                                    </div>
                                  </div>
                                  <div className="col-md-7 d-flex">
                                    <h5 className="unsetDisplay">
                                      Aadhar Number :
                                    </h5>
                                    <div className="profile_adjust_data">
                                      {this.state.user_data["AADHAR_NUMBER"] ? (
                                        this.state.user_data["AADHAR_NUMBER"]
                                      ) : (
                                        <div>NA</div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <br />
                            </div>
                          </div>
                        </div>
                        <div className="second_tab">
                          <div className="face_match_data ">
                            <h2>Cross Validation Result</h2>
                            <h5 className="facematchheader">
                              Face Match Results:
                            </h5>
                            <FMGrid
                              Mainchange={this.props.location.state.profile}
                            />
                          </div>
                          <h5 className="facematchheader mt-5 pt-2">
                            Data Match Results:
                          </h5>
                          <div className="profile">
                            <div className="row">
                              <div className="col-3">
                                <h5>Name :</h5>
                              </div>
                              <div className="col-3">
                                {cross_data.name ? (
                                  <img
                                    style={{
                                      marginTop: "0",
                                      height: "25px",
                                    }}
                                    src={require("./success.svg")}
                                    alt="success"
                                  ></img>
                                ) : (
                                  <img
                                    style={{
                                      marginTop: "0",
                                      height: "25px",
                                    }}
                                    src={require("./error.svg")}
                                    alt="error"
                                  ></img>
                                )}
                              </div>
                              <div className="col-3">
                                <h5>Father's Name :</h5>
                              </div>
                              <div className="col-3">
                                {cross_data.father_name ? (
                                  <img
                                    style={{
                                      marginTop: "0",
                                      height: "25px",
                                    }}
                                    src={require("./success.svg")}
                                    alt="success"
                                  ></img>
                                ) : (
                                  <img
                                    style={{
                                      marginTop: "0",
                                      height: "25px",
                                    }}
                                    src={require("./error.svg")}
                                    alt="error"
                                  ></img>
                                )}
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-3">
                                <h5>House Number :</h5>
                              </div>
                              <div className="col-3">
                                {cross_data.h_no ? (
                                  <img
                                    style={{
                                      marginTop: "0",
                                      height: "25px",
                                    }}
                                    src={require("./success.svg")}
                                    alt="success"
                                  ></img>
                                ) : (
                                  <img
                                    style={{
                                      marginTop: "0",
                                      height: "25px",
                                    }}
                                    src={require("./error.svg")}
                                    alt="error"
                                  ></img>
                                )}
                              </div>
                              <div className="col-3">
                                <h5>PINCode :</h5>
                              </div>
                              <div className="col-3">
                                {cross_data.pin ? (
                                  <img
                                    style={{
                                      marginTop: "0",
                                      height: "25px",
                                    }}
                                    src={require("./success.svg")}
                                    alt="success"
                                  ></img>
                                ) : (
                                  <img
                                    style={{
                                      marginTop: "0",
                                      height: "25px",
                                    }}
                                    src={require("./error.svg")}
                                    alt="error"
                                  ></img>
                                )}
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-3">
                                <h5>DOB :</h5>
                              </div>
                              <div className="col-3">
                                {true ? (
                                  <img
                                    style={{
                                      marginTop: "0",
                                      height: "25px",
                                    }}
                                    src={require("./success.svg")}
                                    alt="success"
                                  ></img>
                                ) : (
                                  <img
                                    style={{
                                      marginTop: "0",
                                      height: "25px",
                                    }}
                                    src={require("./error.svg")}
                                    alt="error"
                                  ></img>
                                )}
                              </div>
                              <div className="col-3">
                                <h5>Address :</h5>
                              </div>
                              <div className="col-3">
                                {cross_data.address ? (
                                  <img
                                    style={{
                                      marginTop: "0",
                                      height: "25px",
                                    }}
                                    src={require("./success.svg")}
                                    alt="success"
                                  ></img>
                                ) : (
                                  <img
                                    style={{
                                      marginTop: "0",
                                      height: "25px",
                                    }}
                                    src={require("./error.svg")}
                                    alt="error"
                                  ></img>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="database_verification mb-4">
                          <h3>Government Database Verification</h3>
                          {Object.entries(this.state.govt_data).map(
                            ([value, id]) => {
                              maindata.push(this.state.govt_data[value]);
                            }
                          )}
                          <div className="d-flex justify-content-around mt-3">
                            {maindata.map((data, id) => {
                              return (
                                <div className="display_data">
                                  <div className="d-flex justify-content-between mt-2">
                                    <div>DB Check</div>
                                    {true ? (
                                      <img
                                        style={{
                                          marginTop: "0",
                                          height: "25px",
                                          marginLeft: "30px",
                                        }}
                                        src={require("./success.svg")}
                                        alt="success"
                                      ></img>
                                    ) : (
                                      <img
                                        style={{
                                          marginTop: "0",
                                          height: "25px",
                                          marginLeft: "30px",
                                        }}
                                        src={require("./error.svg")}
                                        alt="error"
                                      ></img>
                                    )}
                                  </div>

                                  <div className="d-flex justify-content-between mt-2">
                                    <div>DOC Type: {data.doc_type}</div>
                                    {true ? (
                                      <img
                                        style={{
                                          marginTop: "0",
                                          height: "25px",
                                          marginLeft: "30px",
                                        }}
                                        src={require("./success.svg")}
                                        alt="success"
                                      ></img>
                                    ) : (
                                      <img
                                        style={{
                                          marginTop: "0",
                                          height: "25px",
                                          marginLeft: "30px",
                                        }}
                                        src={require("./error.svg")}
                                        alt="error"
                                      ></img>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </LoadingOverlay>
                    </TabContainer>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfilePage;
