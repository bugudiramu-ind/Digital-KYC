import React, { Component } from "react";

import "./uploadDocument.css";
import axios from "axios";

import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";
// import JSONData from '../../json/data.json';

import { Redirect, Link } from "react-router-dom";

import LoadingOverlay from "react-loading-overlay";

import $ from "jquery";
import "../Sidenav/Sidenav.css";
import SideMenu from "../Sidenav/Sidenav";
import Tooltip from "@material-ui/core/Tooltip";
import Modal from "react-bootstrap/Modal";
import { Button, Navbar } from "react-bootstrap";
import { KYC_SIT,PATH } from "../../constants";

class UploadDocument extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Set initial files, type 'local' means this is a file
      // that has already been uploaded to the server (see docs)
      files: [],
      folder_name: "",
      ui_response: "",
      redirect: false,
      redirect_after_10000: false,
      isActive: false,
      showModal: false,
      accessToken: "",
    };

    // this.upload = this.upload.bind(this);

    this.classify = this.classify.bind(this);

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);

    this.logout = this.logout.bind(this);

    this.getBase64 = this.getBase64.bind(this);
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

  handleInit() {
    console.log("FilePond instance has initialised", this.pond);
  }

  componentDidMount() {
    localStorage.removeItem("itemsArray");
    $("#sidebar").toggleClass("activexyz");

    $("#collapseIcon").on("click", function () {
      $("#sidebar").toggleClass("activexyz");
      $(".wrapper").toggleClass("activexyz");
    });

    if (localStorage.getItem("user_type") === "User") {
      console.log("yess");
      $("#set").toggleClass("noDisp");
    }
    const value = localStorage.getItem("access");
    this.setState({
      accessToken: value,
    });
  }

  classify = (event) => {
    event.preventDefault();
    this.setState({ isActive: true });
    var formData = new FormData();
    this.pond
      .getFiles()
      .map((fileItem) => fileItem.file)
      .forEach((file) => {
        formData.append("files", file, file.name);
      });
    console.log(this.pond.getFiles());

    for (var key of formData.entries()) {
      console.log(key[0] + ", " + key[1]);
    }
    const token = this.state.accessToken;
    axios(`${KYC_SIT}${PATH.uid}`, {
      // axios("https://vkyc.in-d.ai/api/upload/uid", {
      method: "get",
      // data: data,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        this.setState({ folder_name: res.data.Folder });
        if (res.status === 200) {
          // alert("Upload Successful");
          // this.setState({enable: true});
          // const data1 = {
          //     "email_id": localStorage.getItem('emailid'),
          //     "cust_key": localStorage.getItem('cust_key'),
          //     "password": localStorage.getItem('password'),
          //     "foldername": this.state.folder_name
          // };
          const uidToken = res.data.result.uid;
          localStorage.setItem("uidtoken", uidToken);
          const files = this.state.files;
          console.log(files[0].name);
          var formData = new FormData();
          // var cnt = 0;
          this.pond
            .getFiles()
            .map((fileItem) => fileItem.file)
            .forEach((file) => {
              formData.append("images", file, file.name);
              console.log("images", file.name);

              let idCardBase64 = "";
              this.getBase64(file, (result) => {
                idCardBase64 = result;
                console.log("idCardBase64", idCardBase64);

                if (localStorage.getItem("itemsArray") === null) {
                  var oldItems = [];
                  console.log("oldItems", JSON.stringify(oldItems));
                  var newItem = { [file.name]: idCardBase64 };
                  oldItems.push(newItem);
                  localStorage.setItem("itemsArray", JSON.stringify(oldItems));
                } else {
                  var oldItems = JSON.parse(localStorage.getItem("itemsArray"));
                  console.log("oldItems", JSON.stringify(oldItems));
                  var newItem = { [file.name]: idCardBase64 };
                  oldItems.push(newItem);
                  localStorage.setItem("itemsArray", JSON.stringify(oldItems));
                }
              });

              // cnt++;
            });
          //   formData.append("images",this.state.files)
          console.log(formData);
          axios(`${KYC_SIT}${PATH.classification}${uidToken}`, {
          // axios(`https://vkyc.in-d.ai/api/class/${uidToken}`, {
            method: "POST",
            data: formData,
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          })
            .then((res) => {
              console.log(res);
              // console.log(res.data);
              if (res.status === 200) {
                this.setState({ ui_response: res.data.result });
                this.setState({ redirect: true });
              } else {
                alert(res.data.desc);
              }
            })
            .catch((error) => alert(error));
        } else {
          alert(res.data.message);
          this.setState({ redirect_after_10000: true });
        }
      })
      .catch((error) => {
        if ("res" in error && "message" in error.res) {
          alert(error.res.message);
        } else {
          alert("error");
        }
      });
  };

  getBase64(file, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }

  render() {
    // const isEnable = this.upload;
    console.log(this.state.ui_response);
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: "/UploadDocPrev",
            state: {
              ui_response: this.state.ui_response,
              folder_name: this.state.folder_name,
            },
          }}
        />
      );
    }

    if (this.state.redirect_after_10000) {
      return (
        <Redirect
          to={{
            pathname: "/Login",
            // state :{ui_response: this.state.ui_response, folder_name: this.state.folder_name}
          }}
        />
      );
    }

    return (
      <div className="App">
        <SideMenu />
        <div className="wrapper">
          <div className="uploadDocumentMain">
            <Navbar id="uploadDocumentHead" className="container" sticky="top">
              <h1>Upload Documents</h1>
            </Navbar>
            <LoadingOverlay
              active={this.state.isActive}
              spinner
              text="Uploading and Classifying..."
            >
              <div
                id="uploadDocumentBody"
                className="container row justify-content-center"
              >
                <div id="outerDiv2" className="row justify-content-center">
                  <div id="outerDiv1">
                    <form onSubmit={this.upload} encType="multipart/form-data">
                      <div className="row justify-content-center">
                        <div id="borderBox1">
                          <FilePond
                            maxTotalFileSize="9500KB"
                            labelMaxTotalFileSizeExceeded={
                              "Maximum total size exceeded"
                            }
                            allowMultiple={true}
                            ref={(ref) => (this.pond = ref)}
                            oninit={() => this.handleInit()}
                            files={this.state.files}
                            onupdatefiles={(fileItems) => {
                              // Set currently activexyz file objects to this.state
                              this.setState({
                                files: fileItems.map(
                                  (fileItem) => fileItem.file
                                ),
                              });
                            }}
                            name="file"
                            id="file"
                            labelIdle='<b>Drag your documents here or <span class="filepond--label-action">Browse</span></b>'
                          />
                        </div>
                      </div>
                    </form>

                    <div style={{ marginTop: "5vh" }}>
                      <hr
                        style={{
                          backgroundColor: "#d1d1d1",
                          width: "95%",
                          marginLeft: "30px !important",
                          marginBottom: "0px !important",
                        }}
                      />

                      <div id="rightAlignButtonDiv">
                        <div className="row">
                          <button id="bottomButton" onClick={this.classify}>
                            Classify
                          </button>
                        </div>
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

export default UploadDocument;
