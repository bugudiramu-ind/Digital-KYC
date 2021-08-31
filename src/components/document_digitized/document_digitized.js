import React, { Component } from "react";

import "./document_digitized.css";
import $ from "jquery";
import LoadingOverlay from "react-loading-overlay";
import Workbook from "react-excel-workbook";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import "../Sidenav/Sidenav.css";
import SideMenu from "../Sidenav/Sidenav";
import Tooltip from "@material-ui/core/Tooltip";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { Button, Navbar } from "react-bootstrap";
import { KYC_SIT,PATH,dummy_kyc } from "../../constants";

class Document_Digitized extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      arr_list: "",
      result: "",
      isActive: false,

      // result : {
      //     "Pan card jpeg.jpg": {
      //       "CANDIDATE_NAME": "SANTOSH SHANKAR KARALE",
      //       "DOB": "NA",
      //       "DOC_TYPE": "PAN Card",
      //       "FATHER_NAME": "SHANKAR KRISHNA KARALE",
      //       "PAN_DOB": "07/01/1988",
      //       "PAN_NUMBER": "BAFPK5656N"
      //     },
      //     "Vinay Singh1.jpg": {
      //       "AADHAR_NUMBER": "",
      //       "ADDRESS": "NA",
      //       "CANDIDATE_NAME": "Vinay Devnath Singh",
      //       "DOB": "01/12/1978",
      //       "DOC_TYPE": "Aadhar Card Front",
      //       "FATHER_SPOUSE_NAME": "",
      //       "GENDER": "Male"
      //     }

      //   },

      // saved_result : {
      //     "Pan card jpeg.jpg": {
      //       "CANDIDATE_NAME": "SANTOSH SHANKAR KARALE",
      //       "DOB": "NA",
      //       "DOC_TYPE": "PAN Card",
      //       "FATHER_NAME": "SHANKAR KRISHNA KARALE",
      //       "PAN_DOB": "07/01/1988",
      //       "PAN_NUMBER": "BAFPK5656N"
      //     },
      //     "Vinay Singh1.jpg": {
      //       "AADHAR_NUMBER": "",
      //       "ADDRESS": "NA",
      //       "CANDIDATE_NAME": "Vinay Devnath Singh",
      //       "DOB": "01/12/1978",
      //       "DOC_TYPE": "Aadhar Card Front",
      //       "FATHER_SPOUSE_NAME": "",
      //       "GENDER": "Male"
      //     }

      //   },

      saved_result: "",

      label1: "",
      label2: "",
      label3: "",
      label4: "",
      label5: "",
      label6: "",
      label7: "",
      label8: "",
      label9: "",
      label10: "",
      str_img: "",

      cur_key: "",

      Aadhar_Card_Front: [],
      Aadhar_Card_Back: [],
      Driving_License: [],
      Pan_Card: [],
      Cancelled_Cheque: [],
      Passport_Back: [],
      Passport_Front: [],
      Voter_ID: [],
      showModal: false,
      showModal1: false,
      showModal2: false,
      cvResult: [],
      fmResult: [],
      profile: "",
      redirect: false,
      foldername: "",
      profileResult: [],
      localfiles: [],
      current_image: null,
    };
    this.input1 = React.createRef();
    this.input2 = React.createRef();
    this.input3 = React.createRef();
    this.input4 = React.createRef();
    this.input5 = React.createRef();
    this.input6 = React.createRef();
    this.input7 = React.createRef();
    this.input8 = React.createRef();
    this.input9 = React.createRef();
    this.input10 = React.createRef();

    this.done = React.createRef();

    this.divRef = React.createRef();

    this.left_display = this.left_display.bind(this);
    this.right_display = this.right_display.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.changed_res = this.changed_res.bind(this);
    this.rightDis = this.rightDis.bind(this);

    this.download = this.download.bind(this);

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);

    this.open1 = this.open1.bind(this);
    this.close1 = this.close1.bind(this);

    this.open2 = this.open2.bind(this);
    this.close2 = this.close2.bind(this);

    this.logout = this.logout.bind(this);
  }

  close() {
    this.setState({ showModal: false });
  }
  close1() {
    this.setState({ showModal1: false });
  }
  close2() {
    this.setState({ showModal2: false });
  }

  open() {
    this.setState({ showModal: true });
  }
  open1() {
    this.setState({ showModal1: true });
  }
  open2() {
    this.setState({ showModal2: true });
  }

  logout() {
    localStorage.clear();
    window.location.href = "/Login";
  }

  componentDidMount = () => {
    const localfiles = JSON.parse(localStorage.getItem("itemsArray"));
    this.setState({ localfiles: localfiles });

    $("#sidebar").toggleClass("activexyz");

    $("#collapseIcon").on("click", function () {
      $("#sidebar").toggleClass("activexyz");
      $(".wrapper").toggleClass("activexyz");
    });

    if (localStorage.getItem("user_type") === "User") {
      $("#set").toggleClass("noDisp");
    }

    this.setState({ result: this.props.location.state.attributes });
    this.setState({ saved_result: this.props.location.state.attributes });

    this.setState({
      arr_list: this.props.location.state.prev_res,
      cvResult: this.props.location.state.cvResult,
      fmResult: this.props.location.state.fmResult,
      foldername: this.props.location.state.foldername,
    });

    if (localStorage.getItem("cross_validation") === "false") {
      $(".cv_button").addClass("cv_disp");
    } else {
      $(".cv_button").removeClass("cv_disp");
    }

    if (localStorage.getItem("face_match") === "false") {
      $(".fm_button").addClass("cv_disp");
    } else {
      $(".fm_button").removeClass("cv_disp");
    }

    for (let i in this.props.location.state.prev_res) {
      console.log(i + "===" + this.props.location.state.prev_res[i].filename);
      this.right_display(
        i,
        this.props.location.state.prev_res[i].filename,
        1,
        1
      );
      break;
    }
  };

  download() {
    let book = [];
    // let Aadhar_Card_Front = [], Driving_License =[];

    // console.log(this.state.saved_result);

    for (let i in this.state.saved_result) {
      // console.log(this.state.saved_result[i].DOC_TYPE);
      if (this.state.saved_result[i].DOC_TYPE === "Aadhar Card Front") {
        this.state.Aadhar_Card_Front.push(this.state.saved_result[i]);
      } else if (this.state.saved_result[i].DOC_TYPE === "Aadhar Card Back") {
        this.state.Aadhar_Card_Back.push(this.state.saved_result[i]);
      } else if (this.state.saved_result[i].DOC_TYPE === "Driving License") {
        this.state.Driving_License.push(this.state.saved_result[i]);
      } else if (this.state.saved_result[i].DOC_TYPE === "PAN Card") {
        this.state.Pan_Card.push(this.state.saved_result[i]);
      } else if (this.state.saved_result[i].DOC_TYPE === "Cancelled Cheque") {
        this.state.Cancelled_Cheque.push(this.state.saved_result[i]);
      } else if (this.state.saved_result[i].DOC_TYPE === "Passport Back") {
        this.state.Passport_Back.push(this.state.saved_result[i]);
      } else if (this.state.saved_result[i].DOC_TYPE === "Passport Front") {
        this.state.Passport_Front.push(this.state.saved_result[i]);
      } else if (this.state.saved_result[i].DOC_TYPE === "Voter ID") {
        this.state.Voter_ID.push(this.state.saved_result[i]);
      }
    }

    book.push(
      <Workbook
        filename="Details.xlsx"
        element={<button className="Ex_button">Export</button>}
      >
        <Workbook.Sheet
          data={this.state.Aadhar_Card_Front}
          name="Aadhar Card Front"
        >
          {/* <Workbook.Column label="FILE_NAME" value="FILE_NAME" /> */}
          <Workbook.Column label="AADHAR_NUMBER" value="AADHAR_NUMBER" />
          <Workbook.Column label="ADDRESS" value="ADDRESS" />
          <Workbook.Column label="CANDIDATE_NAME" value="CANDIDATE_NAME" />
          <Workbook.Column label="DOB" value="DOB" />
          <Workbook.Column label="DOC_TYPE" value="DOC_TYPE" />
          <Workbook.Column
            label="FATHER_SPOUSE_NAME"
            value="FATHER_SPOUSE_NAME"
          />
          <Workbook.Column label="GENDER" value="GENDER" />
        </Workbook.Sheet>

        <Workbook.Sheet
          data={this.state.Aadhar_Card_Back}
          name="Aadhar Card Back"
        >
          {/* <Workbook.Column label="FILE_NAME" value="FILE_NAME" /> */}
          <Workbook.Column label="ADDRESS" value="ADDRESS" />
          <Workbook.Column label="DOC_TYPE" value="DOC_TYPE" />
          {/* <Workbook.Column label="FATHER/SPOUSE NAME" value="FATHER/SPOUSE NAME" /> */}
          <Workbook.Column
            label="FATHER_SPOUSE_NAME"
            value="FATHER_SPOUSE_NAME"
          />
        </Workbook.Sheet>

        <Workbook.Sheet
          data={this.state.Driving_License}
          name="Driving License"
        >
          {/* <Workbook.Column label="FILE_NAME" value="FILE_NAME" /> */}
          <Workbook.Column label="CANDIDATE_NAME" value="CANDIDATE_NAME" />
          <Workbook.Column label="DL_NUMBER" value="DL_NUMBER" />
          <Workbook.Column label="DOB" value="DOB" />
          <Workbook.Column label="DOC_TYPE" value="DOC_TYPE" />
          <Workbook.Column label="FATHER_NAME" value="FATHER_NAME" />
          <Workbook.Column label="VALIDITY" value="VALIDITY" />
        </Workbook.Sheet>

        <Workbook.Sheet data={this.state.Pan_Card} name="PAN Card">
          {/* <Workbook.Column label="FILE_NAME" value="FILE_NAME" /> */}
          <Workbook.Column label="CANDIDATE_NAME" value="CANDIDATE_NAME" />
          <Workbook.Column label="DOB" value="DOB" />
          <Workbook.Column label="DOC_TYPE" value="DOC_TYPE" />
          <Workbook.Column label="FATHER_NAME" value="FATHER_NAME" />
          {/* <Workbook.Column label="PAN_DOB" value="PAN_DOB" /> */}
          <Workbook.Column label="PAN_NUMBER" value="PAN_NUMBER" />
        </Workbook.Sheet>

        <Workbook.Sheet
          data={this.state.Cancelled_Cheque}
          name="Cancelled Cheque"
        >
          {/* <Workbook.Column label="FILE_NAME" value="FILE_NAME" /> */}
          <Workbook.Column label="IFSC" value="IFSC" />
          <Workbook.Column label="NAME" value="NAME" />
          <Workbook.Column label="DOC_TYPE" value="DOC_TYPE" />
          <Workbook.Column label="ACCOUNT_NO" value="ACCOUNT_NO" />
          <Workbook.Column label="BANK_NAME" value="BANK_NAME" />
          <Workbook.Column label="MICR" value="MICR" />
        </Workbook.Sheet>

        <Workbook.Sheet data={this.state.Passport_Back} name="Passport Back">
          {/* <Workbook.Column label="FILE_NAME" value="FILE_NAME" /> */}
          <Workbook.Column label="DOC_TYPE" value="DOC_TYPE" />
          <Workbook.Column label="FATHER_NAME" value="FATHER_NAME" />
          <Workbook.Column label="MOTHER_NAME" value="MOTHER_NAME" />
          <Workbook.Column label="ADDRESS" value="ADDRESS" />
        </Workbook.Sheet>

        <Workbook.Sheet data={this.state.Passport_Front} name="Passport Front">
          {/* <Workbook.Column label="FILE_NAME" value="FILE_NAME" /> */}
          <Workbook.Column label="DOC_TYPE" value="DOC_TYPE" />
          <Workbook.Column label="PASSPORT_NUMBER" value="PASSPORT_NUMBER" />
          <Workbook.Column label="DOB" value="DOB" />
          <Workbook.Column label="CANDIDATE_NAME" value="CANDIDATE_NAME" />
          <Workbook.Column label="SURNAME" value="SURNAME" />
          <Workbook.Column label="PLACE_OF_BIRTH" value="PLACE_OF_BIRTH" />
          <Workbook.Column label="DATE_OF_EXPIRY" value="DATE_OF_EXPIRY" />
        </Workbook.Sheet>

        <Workbook.Sheet data={this.state.Voter_ID} name="Voter ID">
          {/* <Workbook.Column label="FILE_NAME" value="FILE_NAME" /> */}
          <Workbook.Column label="DOC_TYPE" value="DOC_TYPE" />
          <Workbook.Column label="VOTER_ID" value="VOTER_ID " />
          <Workbook.Column label="CANDIDATE_NAME" value="CANDIDATE_NAME" />
          <Workbook.Column label="FATHER_NAME" value="FATHER_NAME" />
          <Workbook.Column label="DOB" value="DOB" />
          <Workbook.Column label="GENDER" value="GENDER" />
          <Workbook.Column label="ADDRESS" value="ADDRESS" />
        </Workbook.Sheet>
      </Workbook>
    );
    return book;
  }

  left_display() {
    // this.right_display("Aadhar Card Front");
    let cards_list = [],
      arr_response1 = this.props.location.state.prev_res;
    let len = Object.keys(arr_response1).length;
    let a = 0;

    console.log("cards_list", arr_response1);
    for (let i in arr_response1) {
      a++;
      if (arr_response1[i].document_type === "Unknown Category") {
        cards_list.push(
          <div className="" id={"thumbNail" + a}>
            <div className="row justify-content-center">
              <div id="dig_imageBox" onClick={this.rightDis(this, a, len)}>
                <div className="row justify-content-center">
                  {arr_response1[i].filename}
                  <img
                    id="dig_imgPan"
                    // src={`data:image/jpg/jpeg/png;base64,${arr_response1[i].image_file}`}
                    alt="PanCard"
                  />
                </div>
                <div id="dig_bottomBoxDiv" className="row">
                  <h6>{arr_response1[i].document_type}</h6>
                </div>
                <div id="dig_colorDiv1" className="row"></div>
              </div>
            </div>
          </div>
        );
      } else if (arr_response1[i].document_type === "Bad Quality") {
        cards_list.push(
          <div className="" id={"thumbNail" + a}>
            <div className="row justify-content-center">
              <div id="dig_imageBox" onClick={this.rightDis.bind(this, a, len)}>
                <div className="row justify-content-center">
                  {arr_response1[i].filename}
                  <img
                    id="dig_imgPan"
                    // src={`data:image/jpg/jpeg/png;base64,${arr_response1[i].image_file}`}
                    alt="PanCard"
                  />
                </div>
                <div id="dig_bottomBoxDiv" className="row">
                  <h6>{arr_response1[i].document_type}</h6>
                </div>
                <div id="dig_colorDiv1" className="row"></div>
              </div>
            </div>
          </div>
        );
      } else {
        cards_list.push(
          <div className="list_left" id={"thumbNail" + a}>
            <div className="row justify-content-center">
              <div
                id="dig_imageBox"
                onClick={this.right_display.bind(
                  this,
                  i,
                  arr_response1[i].filename,
                  a,
                  len
                )}
              >
                <div className="row justify-content-center">
                  {arr_response1[i].filename}
                  {this.state.localfiles.map((localfiles_item) => (
                    <React.Fragment>
                      {Object.entries(localfiles_item).map(([key, value]) => (
                        <React.Fragment>
                          {arr_response1[i].filename === key ? (
                            <img id="dig_imgPan" src={value} alt={""} />
                          ) : (
                            ""
                          )}
                        </React.Fragment>
                      ))}
                    </React.Fragment>
                  ))}
                </div>
                <div id="dig_bottomBoxDiv" className="row">
                  <h6>{arr_response1[i].document_type}</h6>
                </div>
                <div id="dig_colorDiv" className="row"></div>
              </div>
            </div>
          </div>
        );
      }
    }
    // console.log(cards);
    return cards_list;
  }

  rightDis(b, lenn) {
    console.log("rightDis", b);
    console.log("rightDis", lenn);
    for (let j = 1; j <= lenn; j++) {
      if (j === b) {
        $("#thumbNail" + j).addClass("backset");
      } else {
        $("#thumbNail" + j).removeClass("backset");
      }
    }
    document.getElementById("outerDiv3").style.display = "none";
    alert("Data not Extracted!");
  }

  right_display(doc_name, imageStr, b, lenn) {
    console.log("doc_name, imageStr, b, lenn", doc_name, imageStr, b, lenn);

    this.setState({
      Aadhar_Card_Front: [],
      Aadhar_Card_Back: [],
      Driving_License: [],
      Pan_Card: [],
      Cancelled_Cheque: [],
      Passport_Back: [],
      Passport_Front: [],
      Voter_ID: [],
    });

    for (let j = 1; j <= lenn; j++) {
      if (j === b) {
        $("#thumbNail" + j).addClass("backset");
      } else {
        $("#thumbNail" + j).removeClass("backset");
      }
    }
    // this.divRef.current.classList.add('backset');

    // let xx = document.getElementById("thumbNail");
    // xx.className = 'backset';
    document.getElementById("outerDiv3").style.display = "block";

    this.setState({
      str_img: imageStr,
    });
    let count = 0;
    console.log("imageStr", imageStr);

    let dig_result = this.props.location.state.attributes;
    const profileResult = [];
    this.setState({ profileResult: profileResult });
    for (let i in dig_result) {
      console.log("dig_result", dig_result[i].filename);
      count = 0;
      this.setState({ cur_key: imageStr });
      console.log("this.state.cur_key" + this.state.cur_key);

      if (dig_result[i].filename === imageStr) {
        for (let j in dig_result[i]) {
          count++;
          console.log(j + "Right Side value=" + dig_result[i][j]);
          profileResult.push(j + ":" + dig_result[i][j]);
          if (j === "filename") {
            console.log(j);
            this.setState({ current_image: dig_result[i][j] });
          }

          this.setState({
            ["label" + count]: j,
          });
          console.log("count", ["input" + count]);
          document.getElementById(["input" + count]).value = dig_result[i][j];
        }
        for (let k = 1; k <= count; k++) {
          document.getElementById(["label" + k]).style.display = "block";
          document.getElementById(["input" + k]).style.display = "block";
        }
        for (let l = count + 1; l <= 10; l++) {
          document.getElementById(["label" + l]).style.display = "none";
          document.getElementById(["input" + l]).style.display = "none";
        }
      }
    }
  }
  handleChange(current_key) {
    // console.log(document.getElementById(['input'+1]).value);
    //  console.log("cur_label"+cur_label);
    //  console.log("current_key"+current_key);

    let count = 0;
    let saved_result_copy = this.state.saved_result;
    for (let i in this.state.saved_result) {
      if (i === current_key) {
        for (let j in this.state.saved_result[i]) {
          // console.log("j__"+j);
          count++;

          // if(j === cur_label){
          // console.log(count);
          saved_result_copy[i][j] = document.getElementById([
            "input" + count,
          ]).value;
          // console.log("----"+this.state.saved_result[i][j]);
          // }
        }
      }
      count = 0;
    }
    this.setState({ saved_result: saved_result_copy });
    console.log(this.state.saved_result);
    alert("Saved Successfully");
  }

  cvTable() {
    let tableCV = [],
      fin = [];
    tableCV.push(
      <Table striped bordered>
        <tr>
          <th>Files</th>
          <th>Name</th>
          <th>Father's Name</th>
          <th>Address</th>
          <th>House Number</th>
          <th>Pincode</th>
        </tr>

        {this.cvRows(this.state.cvResult)}
      </Table>
    );
    fin.push(tableCV);

    return fin;
  }

  cvRows(cvCompRes) {
    let rowsCV = [];

    for (let i in cvCompRes) {
      rowsCV.push(<tr>{this.cvRowsEach(cvCompRes[i])}</tr>);
    }

    return rowsCV;
  }

  cvRowsEach(cvCompRow) {
    let rowEachCV = [];

    for (let i in cvCompRow) {
      rowEachCV.push(<td>{cvCompRow[i]}</td>);
    }

    return rowEachCV;
  }

  fmTable() {
    let tableFM = [],
      fi = [];
    tableFM.push(
      <Table striped bordered>
        <tr>
          <th>Files</th>
          <th>Score</th>
        </tr>

        {this.fmRows(this.state.fmResult)}
      </Table>
    );
    fi.push(tableFM);

    return fi;
  }

  fmRows(fmCompRes) {
    let rowsFM = [];

    for (let i in fmCompRes) {
      rowsFM.push(<tr>{this.fmRowsEach(fmCompRes[i])}</tr>);
    }

    return rowsFM;
  }

  fmRowsEach(fmCompRow) {
    let rowEachFM = [];

    for (let i in fmCompRow) {
      rowEachFM.push(<td>{fmCompRow[i]}</td>);
    }

    return rowEachFM;
  }

  viewProfile() {
    this.setState({ isActive: true });
    const data = {
      email_id: localStorage.getItem("emailid"),
      cust_key: localStorage.getItem("cust_key"),
      password: localStorage.getItem("password"),
      foldername: this.state.foldername,
      uidToken: localStorage.getItem("uidtoken"),
      accessToken: localStorage.getItem("access"),
    };
    let formData = new FormData();
    formData.append("channel", true);
    localStorage.setItem("foldername", this.state.foldername);
    axios(`${KYC_SIT}${PATH.verification}${data.uidToken}`, {
    // axios(`https://kycsit.in-d.ai/api/verification/kyc/${data.uidToken}`, {
      method: "POST",
      data: formData,
      headers: {
        Authorization: `Bearer ${data.accessToken}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        console.log(res);
        if (res.status === 200) {
          this.setState({
            profile: res.data,
          });
          this.setState({ redirect: true });
        }
      })
      .catch((error) => alert(error));
  }

  render() {
    console.log(this.state.profile);
    //   console.log(this.props.location.state)
    //   console.log(this.state.profileResult)
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: "/ProfilePage",
            state: {
              profile: this.state.profile,
              prop_cache: this.props.location.state,
              profileResult: this.state.profileResult,
            },
          }}
        />
      );
    }

    return (
      <div className="App">
        <SideMenu />
        <LoadingOverlay
          active={this.state.isActive}
          spinner
          text="Loading Please Wait..."
        >
          <div className="wrapper">
            <div className="digitizedMain">
              <Navbar id="digitizedHead" sticky="top" className="container row">
                <h6>Review</h6>
                <div id="exp_but_div">
                  <button className="cv_button" onClick={this.open1}>
                    Cross Validation Result
                  </button>
                  <Modal
                    show={this.state.showModal1}
                    onHide={this.close1}
                    size="lg"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Cross Validation Result</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="row  justify-content-center">
                      {this.cvTable()}
                    </Modal.Body>
                  </Modal>

                  <button className="fm_button" onClick={this.open2}>
                    Face Match Result
                  </button>
                  <Modal
                    show={this.state.showModal2}
                    onHide={this.close2}
                    size="lg"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Face Match Result</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="row  justify-content-center">
                      {this.fmTable()}
                    </Modal.Body>
                  </Modal>

                  <Link to="/UploadDoc">
                    {" "}
                    <button className="Up_button">Upload Document</button>
                  </Link>
                  {this.download()}
                  <button
                    className="vp_button"
                    onClick={this.viewProfile.bind(this)}
                  >
                    View Profile
                  </button>
                  {/* <button onClick={this.download()} className="Ex_button">Export</button> */}
                </div>
              </Navbar>
              <div id="digitizedBody" className="container1">
                <div className="row justify-content-center">
                  <div
                    id="digLeft"
                    className="col-2"
                    style={{ overflowY: "scroll", height: "87vh" }}
                  >
                    <ul>
                      <li>{this.left_display()}</li>
                    </ul>
                  </div>

                  <div id="digRight" className="col-10">
                    <div id="outerDiv3">
                      <div className="row">
                        <div
                          id="outerDivCombined"
                          style={{
                            height: "60vh",
                            overflowY: "scroll",
                            overflowX: "hidden",
                            width: "100%",
                          }}
                        >
                          <div className="row" style={{}}>
                            <div
                              id="innerDigLeft"
                              className="col-6 justify-content-center"
                            >
                              {this.state.localfiles.map((localfiles_item) => (
                                <React.Fragment>
                                  {Object.entries(localfiles_item).map(
                                    ([key, value]) => (
                                      <React.Fragment>
                                        {this.state.current_image === key ? (
                                          <img
                                            id="imageClassify"
                                            src={value}
                                            alt={""}
                                          />
                                        ) : (
                                          ""
                                        )}
                                      </React.Fragment>
                                    )
                                  )}
                                </React.Fragment>
                              ))}
                            </div>
                            <div id="innerDigRight" className="col-6">
                              <div id="rightContent">
                                <label id="label1">{this.state.label1}</label>
                                <input
                                  id="input1"
                                  ref={this.input1}
                                  className="textInput1"
                                  type="text"
                                  placeholder=""
                                  size="45"
                                  required
                                />

                                <label id="label2">{this.state.label2}</label>
                                <input
                                  id="input2"
                                  ref={this.input2}
                                  className="textInput1"
                                  type="text"
                                  placeholder=""
                                  size="45"
                                  required
                                />

                                <label id="label3">{this.state.label3}</label>
                                <input
                                  id="input3"
                                  ref={this.input3}
                                  className="textInput1"
                                  type="text"
                                  placeholder=""
                                  size="45"
                                  required
                                />

                                <label id="label4">{this.state.label4}</label>
                                <input
                                  id="input4"
                                  ref={this.input4}
                                  className="textInput1"
                                  type="text"
                                  placeholder=""
                                  size="45"
                                  required
                                />

                                <label id="label5">{this.state.label5}</label>
                                <input
                                  id="input5"
                                  ref={this.input5}
                                  className="textInput1"
                                  type="text"
                                  placeholder=""
                                  size="45"
                                  required
                                />

                                <label id="label6">{this.state.label6}</label>
                                <input
                                  id="input6"
                                  ref={this.input6}
                                  className="textInput1"
                                  type="text"
                                  placeholder=""
                                  size="45"
                                  required
                                />

                                <label id="label7">{this.state.label7}</label>
                                <input
                                  id="input7"
                                  ref={this.input7}
                                  className="textInput1"
                                  type="text"
                                  placeholder=""
                                  size="45"
                                  required
                                />

                                <label id="label8">{this.state.label8}</label>
                                <input
                                  id="input8"
                                  ref={this.input8}
                                  className="textInput1"
                                  type="text"
                                  placeholder=""
                                  size="45"
                                  required
                                />

                                <label id="label9">{this.state.label9}</label>
                                <input
                                  id="input9"
                                  ref={this.input9}
                                  className="textInput1"
                                  type="text"
                                  placeholder=""
                                  size="45"
                                  required
                                />

                                <label id="label10">{this.state.label10}</label>
                                <input
                                  id="input10"
                                  ref={this.input10}
                                  className="textInput1"
                                  type="text"
                                  placeholder=""
                                  size="45"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <Navbar id="dig_bottomDiv">
                          {JSON.stringify(this.state.cur_key)}
                          <button
                            id="dig_bottomButton"
                            onClick={this.handleChange.bind(
                              this,
                              this.state.cur_key
                            )}
                            ref={this.done}
                          >
                            Save
                          </button>
                        </Navbar>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </LoadingOverlay>
      </div>
    );
  }
}

export default Document_Digitized;
