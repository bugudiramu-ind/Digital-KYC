import React, { Component } from 'react';

import axios from 'axios';

import { Table } from 'reactstrap';

import $ from 'jquery';
import '../Sidenav/Sidenav.css';
import SideMenu from '../Sidenav/Sidenav';
import { Link } from 'react-router-dom';

import { Button, Navbar } from 'react-bootstrap';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Label,
  Tooltip as Tooltipp,
} from 'recharts';

import './dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usr_count: [],
      showModal: false,
      list: [],
      monthly_usage: '',
      Rdocuments: 0,
    };

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);

    this.logout = this.logout.bind(this);
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  componentDidMount() {
    $('#sidebar').toggleClass('activexyz');

    $('#collapseIcon').on('click', function () {
      $('#sidebar').toggleClass('activexyz');
      $('.wrapper').toggleClass('activexyz');
    });

    if (localStorage.getItem('user_type') === 'User') {
      console.log('yess');
      $('#set').toggleClass('noDisp');
    }

    const data = {
      custkey: localStorage.getItem('cust_key'),
    };

    axios(process.env.REACT_APP_FS_API_URL + 'usage_stats', {
      method: 'POST',
      data: JSON.stringify(data),
      headers: {
        // 'Authorization': `bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      console.log('result:', res.data.result.monthly_usage);

      if (res.status === 200) {
        this.setState({
          usr_count: res.data.result.usr_count,
          monthly_usage: res.data.result.monthly_usage,
          Rdocuments: 5000 - res.data.result.rem_documents,
        });
        // console.log(this.state.usr_count);
        var arr = [];

        // var objj = {
        //     "name": "Sep 2019",
        //     "count": 19
        // };
        // arr.push(objj);

        for (var i in this.state.monthly_usage) {
          console.log(this.state.monthly_usage[i]._id.month);
          console.log(this.state.monthly_usage[i]._id.year);
          console.log(this.state.monthly_usage[i].count);

          // var list = {...this.state.list};
          var str =
            this.state.monthly_usage[i]._id.month.substring(0, 3) +
            ' ' +
            this.state.monthly_usage[i]._id.year;

          var obj = {
            name: str,
            count: this.state.monthly_usage[i].count,
          };

          arr.push(obj);
        }

        this.setState({ list: arr });
      }
    });
  }

  logout() {
    localStorage.clear();
    window.location.href = '/Login';
  }

  userTable() {
    var tab = [];

    for (var i in this.state.usr_count) {
      tab.push(
        <tr key={i}>
          <td>
            {this.state.usr_count[i].email.substring(
              0,
              this.state.usr_count[i].email.indexOf('@')
            )}
          </td>
          <td>{this.state.usr_count[i].counter}</td>
        </tr>
      );
    }

    return tab;
  }

  render() {
    return (
      <div className='App'>
        <SideMenu />
        <div className='wrapper'>
          <div className='dashboardMain'>
            <Navbar id='dashboardHead' className='container' sticky='top'>
              <h1>Dashboard</h1>
            </Navbar>
            <div id='dashboardBody'>
              <div className='container'>
                <div className='justify-content-center'>
                  <div>
                    <div id='helloName'>
                      <h2>Hello Harry,</h2>
                    </div>

                    <div id='countRow' className='row'>
                      <div id='countCol' className=''>
                        <div id='countColInner'>
                          <h6>Total Documents Processed</h6>
                          <p id='totalCount'>{this.state.Rdocuments}</p>
                        </div>
                      </div>

                      {/* <div id="countCol" className="">
                                                <div id="countColInner">
                                                    <h6>Documents Successful</h6>
                                                    <p id="successCount">994</p>
                                                </div>
                                            </div>

                                            <div id="countCol" className="">
                                                <div id="countColInner">
                                                    <h6>Documents Unsuccessful</h6>
                                                    <p id="unsuccessCount">6</p>
                                                </div>
                                            </div> */}
                    </div>

                    <div id='dataVisualRow' className='row'>
                      <div id='dataVisualCol' className=''>
                        <div id='dataVisualInner'>
                          <h3>Document Trends</h3>
                          {/* <Chart /> */}
                          <BarChart
                            width={700}
                            height={300}
                            data={this.state.list}
                            margin={{ top: 50, right: 10, left: 15, bottom: 0 }}
                          >
                            <CartesianGrid vertical={false} stroke='#ebf3f0' />
                            <XAxis dataKey='name' />
                            <YAxis>
                              <Label
                                value='Documents Processed'
                                angle={-90}
                                position='left'
                                style={{ textAnchor: 'middle' }}
                              />
                            </YAxis>
                            <Tooltipp cursor={{ fill: '#F0EDEC' }} />

                            <Bar dataKey='count' barSize={20} fill='#bcbcbc' />
                          </BarChart>
                        </div>
                      </div>
                      <div id='userSplitViewCol' className=''>
                        <div id='userSplitViewInner'>
                          <h3>User-wise split view</h3>
                          {/* <UserList dataFromParent = {this.state.usr_count} /> */}
                          <Table responsive>
                            <thead>
                              <tr>
                                <th>User</th>
                                <th>Documents Processed</th>
                              </tr>
                            </thead>

                            <tbody>{this.userTable()}</tbody>
                          </Table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
