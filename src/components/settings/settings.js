import React, { Component } from 'react';

import './settings.css';
import axios from 'axios';

import { Link } from 'react-router-dom';

import CustomizedTables from './userTable';

import $ from 'jquery';
import '../Sidenav/Sidenav.css';
import SideMenu from '../Sidenav/Sidenav';
import { Button, InputGroup, FormControl } from 'react-bootstrap';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: '',
      tableArray: [],
      samp: [
        { email_id: 'abc', status: 'activexyz' },
        { email_id: 'abc', status: 'activexyz' },
        { email_id: 'abc', status: 'activexyz' },
      ],
      showModal: false,
    };
    this.createList = this.createList.bind(this);
    this.add = this.add.bind(this);
    this.display = this.display.bind(this);

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

  logout() {
    localStorage.clear();
    window.location.href = '/Login';
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

    this.display();
  }

  display() {
    const data2 = {
      custkey: localStorage.getItem('cust_key'),
    };

    axios(process.env.REACT_APP_FS_API_URL + 'display_users', {
      method: 'POST',
      data: JSON.stringify(data2),
      headers: {
        // 'Authorization': `bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      console.log('get user list', res.data);

      if (res.status === 200) {
        this.setState({
          tableArray: res.data.result,
        });
        // var xx = res.data.result;

        // for(var i=0; i< xx.length; i++){
        //     this.state.tableArray.push(xx[i]);

        // }
      }
      // SEND res.data.response to userTable.js and there mention it as row variable
    });
  }

  createList = (e) => {
    this.setState({ mail: e.target.value });
  };

  add = () => {
    // e.preventDefault();
    var mailStr = this.state.mail;
    mailStr = mailStr.replace(/ /g, '');
    var mailList = mailStr.split(',');

    console.log(mailList);

    const data = {
      custid: localStorage.getItem('custid'),
      users: mailList,
    };

    axios(process.env.REACT_APP_FS_API_URL + 'add_user', {
      method: 'POST',
      data: JSON.stringify(data),
      headers: {
        // 'Authorization': `bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      console.log(res.data.message);
      // console.log(res.data);
      alert(res.data.message);
      if (res.status === 200) {
        console.log('200 in add user');

        this.setState({ tableArray: [] });
        this.display();
      }
    });
  };

  render() {
    return (
      <div className='App'>
        <SideMenu />
        <div className='wrapper'>
          <div className='settingsMain'>
            <div id='settingsHead'>
              <div className='container'>
                <div id='heading' className='row'>
                  <h6>Settings</h6>
                </div>
              </div>
              <hr id='hor_Set'></hr>
              <div id='upperNavContainer' className='container'>
                <div id='upperNavBar' className='row justify-content-left'>
                  <Link to='/Settings'>
                    <a href='#/' id='hov' className='activeNav'>
                      Users
                    </a>{' '}
                  </Link>

                  <Link to='/Plans_Billing'>
                    <a href='#/' id='hov' className=''>
                      Plans and Billing
                    </a>{' '}
                  </Link>
                </div>
              </div>
              <hr id='hor_Set'></hr>
            </div>
            <div id='settingsBody' className='container row'>
              <div id='addUserDiv' className='row'>
                <div>
                  <div id='addUserLabel' className='row'>
                    <h6>Add User</h6>
                  </div>
                  <div className='row'>
                    <InputGroup>
                      <FormControl
                        className='addUsertextInput'
                        placeholder=''
                        name='uname'
                        onChange={this.createList}
                        type='text'
                        // aria-label="Recipient's username"
                        // aria-describedby="basic-addon2"
                      />
                      <Button
                        type='submit'
                        id='addUserButton'
                        onClick={this.add}
                      >
                        Add
                      </Button>
                    </InputGroup>
                    {/* <InputGroup name="uname" className="addUsertextInput" onChange={this.createList} type="text" placeholder=""></InputGroup>
                                        <button type="submit" id="addUserButton" onClick={this.add}>Add</button> */}
                  </div>
                  <div id='addUserNote' className='row'>
                    <p>
                      For multiple user IDs, use comma to seperate each entry.
                      For example: user1@example.com, user2@example.com.
                    </p>
                  </div>
                </div>
              </div>
              <div id='addUserTable' className='row'>
                <CustomizedTables dataFromParent={this.state.tableArray} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;
