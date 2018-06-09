/*
 * @Author: Mr.He 
 * @Date: 2018-06-04 17:29:29 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-06-09 10:23:12
 * @content: 
 */

import React, { Component } from "react";
import particlesConfig from "./particles.json";
import particlesJS from "particles.js";

console.log(particlesJS)
export default class Login extends Component {
    constructor() {
        super();

        this.state = {
            box: {
                height: window["innerHeight"],
                width: window["innerWidth"],
            }
        }
    }

    componentDidMount() {
        // sessionStorage.setItem("token", "ok");
        // setTimeout(() => {
        //     location.hash = "/app";
        // }, 3000);

        let box = this.refs.box;

        window.particlesJS("box", particlesConfig);
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
            <div id="box" ref="box" style={this.state.box}>

            </div>
        );
    }
}