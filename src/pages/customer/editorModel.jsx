/*
 * @Author: Mr.He 
 * @Date: 2018-09-10 23:06:51 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-09-24 23:38:05
 * @content: editor Model */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { List, Avatar, Button, Spin, Modal, InputNumber, Input, Table } from 'antd';
import "./index.css";
import store from "../../store";
import { fetchType, updateType, addType } from "../../actions/types";
import { Ajax } from "../../utils/common";
// import 

class EditorModel extends Component {
    constructor(props) {

        console.log("hello ")
        super(props);
    }

    state = {

    }

    addCancel = () => {
        this.props.visible = true;
    }

    addSubmit = () => {
        console.log(this.props.data);
    }
    addChange = () => {

    }

    componentDidMount = () => {
        console.log(11111111, Date.now())
    }

    render() {
        let data = this.props.data;

        return (
            <Modal
                title="添加客户"
                visible={this.props.visible}
                onCancel={this.props.cancel}
                footer={[
                    <Button key="submit" type="primary" onClick={this.addSubmit}>
                        添加
                        </Button>
                ]}
                destroyOnClose={true}
            >
                姓名*:
                <Input
                    defaultValue={data.name}
                    onChange={(e) => {
                        data.name = e.target.value;
                    }}
                    style={{ "width": "80%", "marginBottom": "5px" }}
                ></Input>
                <br />
                电话&nbsp;:
                <Input
                    defaultValue={data.mobile}
                    onChange={(e) => {
                        data.mobile = e.target.value;
                    }} style={{ "width": "80%", "marginBottom": "5px" }}></Input>
                <br />
                地址&nbsp;: <Input
                    defaultValue={data.address}
                    onChange={(e) => {
                        data.address = e.target.value;
                    }} style={{ "width": "80%", "marginBottom": "5px" }}></Input>
                <br />
                其它&nbsp;: <Input
                    defaultValue={data.other}
                    onChange={(e) => {
                        data.other = e.target.value;
                    }} style={{ "width": "80%", "marginBottom": "5px" }}></Input>
            </Modal>
        );
    }
}


export default EditorModel;