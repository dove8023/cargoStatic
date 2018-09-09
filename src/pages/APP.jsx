/*
 * @Author: Mr.He 
 * @Date: 2018-06-08 17:41:21 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-06-09 17:08:02
 * @content: 
 */

import React, { Component } from "react";
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
const { Header, Sider, Content } = Layout;
import Main from "./main/index.jsx";
import Login from "./login/index.jsx";

export default class APP extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Login} />

                    <Route path="/main" component={Main} />
                </div>

            </Router>
        );
    }
}