/*
 * @Author: Mr.He 
 * @Date: 2018-06-09 17:32:12 
 * @Last Modified by: he@whaleblue.design
 * @Last Modified time: 2018-08-19 16:16:15
 * @content: side. */

import React, { Component } from "react";
import { Layout, Menu, Icon } from 'antd';
const { Sider } = Layout;
import { HashRouter as Router, Route, Link, Redirect } from 'react-router-dom';


export default class MainSider extends Component {
    render() {
        return (
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
            >
                <div className="logo">货物系统</div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">
                        <Icon type="user" />
                        <span className="nav-text">
                            <Link to="/main">
                                收货
                            </Link>
                        </span>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Icon type="video-camera" />
                        <span className="nav-text">
                            <Link to="/main/order">
                                收货记录
                            </Link>
                        </span>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Icon type="upload" />
                        <span className="nav-text">
                            <Link to="/main/types">
                                品种管理
                            </Link>
                        </span>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Icon type="user" />
                        <span className="nav-text">
                            客户管理
                        </span>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <Icon type="user" />
                        <span className="nav-text">
                            货物统计
                        </span>
                    </Menu.Item>
                    <Menu.Item key="6">
                        <Icon type="user" />
                        <span className="nav-text">
                            用户管理
                        </span>
                    </Menu.Item>
                    <Menu.Item key="7">
                        <Icon type="user" />
                        <span className="nav-text">
                            退出
                        </span>
                    </Menu.Item>
                </Menu>
            </Sider>
        );
    }
}
