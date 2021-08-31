import React, { Component } from "react";

import './userSplitTable.css';

import { Table } from 'reactstrap';

export default class UserList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tabData: props.dataFromParent,
        }

    }

    componentDidMount() {
        
        // this.setState({
        //     tabData: this.dataFromParent
        // })

        console.log(this.state.tabData);
        for(var i in this.props.dataFromParent){
            console.log(this.props.dataFromParent[i]);
        }
       
    }


    render() {
        return (
            <Table>

                <thead >
                    <tr>
                        <th>User List</th>
                        <th>Successful</th>
                        <th>Unsuccessful</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>Mark</td>
                        <td>122</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>Jacob</td>
                        <td>56</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>Larry</td>
                        <td>33</td>
                        <td>0</td>
                    </tr>
                </tbody>

            </Table>
        );
    }
}