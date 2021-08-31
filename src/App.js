import React, { Component } from "react";

import Register from "./components/register/register.js";

import Mess_Display from "./components/register/mess_display";
import Mess_Act_Cust from "./components/activate_customer/mess_act_cust";

import InviteUser from "./components/inviteUser/inviteUser";

import Login from "./components/login/login.js";

import Dashboard from "./components/dashboard/dashboard.js";

import ActivateCustomer from "./components/activate_customer/activate_customer.js";

import UploadDoc from "./components/uploadDocument/uploadDocument";

import UploadDocPrev from "./components/uploadDocPreview/uploadDocPreview";

import Document_Digitized from "./components/document_digitized/document_digitized";

import ProfilePage from "./components/profile_page/profile_page";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Settings from "./components/settings/settings";
import Plans_Billing from "./components/settings/plans_billing";

import Payy from "./components/settings/payy";

// const fs_url = "http://0.0.0.0:5005";

class App extends Component {
  render() {
    return (
      <div>
        <Router  basename={'/digitalkyc'}>
          <Switch>
            {/* <Sidenav /> */}
            <Route exact path="/" component={Login} />
            <Route exact path="/Register" component={Register} />
            <Route exact path="/Display" component={Mess_Display} />
            <Route exact path="/Mess_Act_Cust" component={Mess_Act_Cust} />
            <Route exact path="/UploadDoc" component={UploadDoc} />
            <Route exact path="/UploadDocPrev" component={UploadDocPrev} />
            <Route
              exact
              path="/Document_Digitized"
              component={Document_Digitized}
            />
            <Route exact path="/ProfilePage" component={ProfilePage} />
            <Route exact path="/Login" component={Login} />
            <Route
              exact
              path="/ActivateCustomer"
              component={ActivateCustomer}
            />
            <Route exact path="/InviteUser" component={InviteUser} />
            <Route exact path="/Dashboard" component={Dashboard} />
            <Route exact path="/Settings" component={Settings} />
            <Route exact path="/Plans_Billing" component={Plans_Billing} />
            <Route exact path="/Payy" component={Payy} />

            {/* <Register /> */}
            {/* <ActivateCustomer /> */}
            {/* <UploadDocPrev /> */}
            {/* <UploadDoc /> */}
            {/* <Document_Digitized/> */}
            {/* <Mess_Display /> */}
            {/* <Login /> */}

            {/* <Payy/> */}
            {/* <Redirect to={{pathname:"/Sample"}} /> */}
            {/* <Route exact path="/Sample" component={Sample} /> */}
          </Switch>

          {/* <Sample /> */}

          {/* <Plans_Billing /> */}
        </Router>

        {/* <InviteUser /> */}

        {/* <Dashboard /> */}
      </div>
    );
  }
}
export default App;
