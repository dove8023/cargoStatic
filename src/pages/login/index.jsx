/*
 * @Author: Mr.He 
 * @Date: 2018-06-04 17:29:29 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-06-18 11:01:58
 * @content: 
 */

import React, { Component } from "react";
import particlesConfig from "./particles.json";
import "./index.css";
import "particles.js";
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;
import { Ajax } from "../../utils/common";


export default class Login extends Component {
    constructor() {
        super();

        this.state = {
            box: {
                height: window["innerHeight"],
                width: window["innerWidth"],
            },
            username: "",
            password: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        let token = sessionStorage.getItem("token");
        if (token) {
            location.hash = "/main";
        }
    }

    componentDidMount() {
        window.particlesJS("backBox", particlesConfig);
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        let result = await Ajax({
            url: "/open/login",
            method: "post",
            data: {
                mobile: this.state.username,
                password: this.state.password
            }
        });
        if (result.code == 0) {
            sessionStorage.setItem("token", result.data);
            location.hash = "/main";
        } else {
            alert(result.msg);
        }
    }
    onChangeUserName = (e) => {
        this.state.username = e.target.value;
    }
    onChangePassword = (e) => {
        this.state.password = e.target.value;
    }
    render() {
        window.onresize = () => {
            this.setState({
                box: {
                    height: window["innerHeight"],
                    width: window["innerWidth"],
                }
            })
        }
        return (
            <div>
                <div id="backBox" style={this.state.box}></div>
                <section className="login-box">
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem>
                            <Input onChange={this.onChangeUserName} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                        </FormItem>
                        <FormItem>
                            <Input onChange={this.onChangePassword} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                        </FormItem>
                        <FormItem>
                            <Checkbox>Remember me</Checkbox>
                            <a className="login-form-forgot" href="###">Forgot password</a>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                            Or <a href="###">register now!</a>
                        </FormItem>
                    </Form>
                </section>
            </div>
        );
    }
}