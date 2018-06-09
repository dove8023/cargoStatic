/*
 * @Author: Mr.He 
 * @Date: 2018-06-04 17:29:29 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-06-09 11:57:14
 * @content: 
 */

import React, { Component } from "react";
import particlesConfig from "./particles.json";
import "./index.css";
import "particles.js";
import axios from "axios";
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;
import { BACK_SYSTEM_URL } from "../../../config";


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

    componentDidMount() {
        // sessionStorage.setItem("token", "ok");
        // setTimeout(() => {
        //     location.hash = "/app";
        // }, 3000);


        window.particlesJS("backBox", particlesConfig);
    }

    handleSubmit = (e) => {
        e.preventDefault();

        console.log(this.state);

        axios({
            url: BACK_SYSTEM_URL + "/open/login",
            method: "post",
            data: {
                mobile: this.state.username,
                password: this.state.password
            }
        }).then((resp) => {
            console.log(resp);
        })
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