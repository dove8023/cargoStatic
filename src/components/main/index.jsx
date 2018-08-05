/*
 * @Author: Mr.He 
 * @Date: 2018-06-04 19:37:42 
 * @Last Modified by: he@whaleblue.design
 * @Last Modified time: 2018-07-29 11:24:37
 * @content: 
 */

import React, { Component } from "react";
import { HashRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import "./index.css";
import MainSider from "./side.jsx";
import Types from "../types/index.jsx";
import TakeGood from "../takeGoods/index.jsx";
import Order from "../order/index.jsx";

export default class APP extends Component {
    constructor() {
        super();
        this.state = {
            contentStyle: {
                padding: 10, background: '#fff', minHeight: window.innerHeight - 20
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
                    padding: 10, background: '#fff', minHeight: window.innerHeight - 20
                }
            })
        }
        return (
            <Router>
                <Layout>
                    <MainSider />
                    <Layout>
                        <Content style={{ margin: '10px' }}>
                            <div style={this.state.contentStyle}>
                                <Route exact path="/main" component={TakeGood} />
                                <Route path="/main/takeGood" component={TakeGood} />
                                <Route path="/main/types" component={Types} />
                                <Route path="/main/Order" component={Order} />
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