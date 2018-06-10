/*
 * @Author: Mr.He 
 * @Date: 2018-06-04 19:37:42 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-06-10 12:22:15
 * @content: 
 */

import React, { Component } from "react";
import { HashRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import "./index.css";
import MainSider from "./side.jsx";
import Types from "../types/index.jsx";

class Trade extends Component {
    render() {
        return (
            <h3>
                Trade Trade.
            </h3>
        );
    }
}

class Order extends Component {
    render() {
        return (
            <h3>
                Order Order.
            </h3>
        );
    }
}

export default class APP extends Component {
    constructor() {
        super();
        this.state = {
            contentStyle: {
                padding: 24, background: '#fff', minHeight: window.innerHeight - 34
            }
        }
    }

    componentWillMount() {
        let token = sessionStorage.getItem("token");
        if (!token) {
            location.hash = "/";
        }
    }

    render() {

        window.onresize = () => {
            this.setState({
                contentStyle: {
                    padding: 24, background: '#fff', minHeight: window.innerHeight - 34
                }
            })
        }
        return (
            <Router>
                <Layout>
                    <MainSider />
                    <Layout>
                        <Content style={{ margin: '24px 16px 10px' }}>
                            <div style={this.state.contentStyle}>
                                <Route exact path="/main" component={Trade} />
                                <Route path="/main/order" component={Order} />
                                <Route path="/main/types" component={Types} />
                            </div>
                        </Content>
                        {/* <Footer style={{ textAlign: 'center' }}>
                            Ant Design ©2016 Created by Ant UED
                        </Footer> */}
                    </Layout>
                </Layout>
            </Router>
        );
    }
}