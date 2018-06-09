/*
 * @Author: Mr.He 
 * @Date: 2018-06-04 19:37:42 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-06-08 18:12:16
 * @content: 
 */

import React, { Component } from "react";
import { HashRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
const { Header, Sider, Content } = Layout;

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

    }

    componentWillMount() {
        console.log("here");
        alert(1);


        let token = sessionStorage.getItem("token");
        console.log(123, "token ", token);
        if (!token) {
            location.hash = "/login";
        }
    }

    render() {
        return (
            <Router>
                <Layout>
                    <div>
                        <Link to="/app">
                            卖单列表
                        </Link>
                        <hr />
                        <Link to="/app/order">
                            买单列表
                        </Link>
                    </div>
                    <section>
                        <Route exact path="/app" component={Trade} />
                        <Route path="/app/order" component={Order} />
                    </section>
                </Layout>
            </Router>
        );
    }
}