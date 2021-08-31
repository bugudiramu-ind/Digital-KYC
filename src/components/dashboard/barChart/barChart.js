import React, { Component } from "react";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Label
} from 'recharts';

//const {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} = Recharts;

const data = [
    { name: 'Jan', pv: 2400 },
    { name: 'Feb', pv: 1398 },
    { name: 'Mar', pv: 2000 },
    { name: 'Apr', pv: 3908 },
    { name: 'May', pv: 4800 },
    { name: 'Jun', pv: 3800 },
    { name: 'Jul', pv: 4300 },
    { name: 'Aug', pv: 7200 },
    { name: 'Sep', pv: 5500 },
    { name: 'Oct', pv: 3800 },
    { name: 'Nov', pv: 2200 },
    { name: 'Dec', pv: 3300 },
];

export default class chart extends Component {
    state = {
        list: [...data]
    };

    render() {
        const { list } = this.state;
        return (
            <BarChart width={700} height={300} data={list}
                margin={{ top: 50, right: 10, left: 15, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="#ebf3f0" />
                <XAxis dataKey="name" />
                <YAxis>
                    <Label value="Documents" angle={-90} position="left" style={{ textAnchor: 'middle' }} />
                </YAxis>
                <Tooltip cursor={{ fill: "#F0EDEC" }} />

                <Bar dataKey="pv" barSize={20} fill="#bcbcbc" />

            </BarChart>
        );
    }
}
