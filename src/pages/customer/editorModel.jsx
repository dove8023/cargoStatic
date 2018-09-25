/*
 * @Author: Mr.He 
 * @Date: 2018-09-10 23:06:51 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-09-24 23:38:05
 * @content: editor Model */

import React, { Component } from "react";
import { Button, Modal, Input } from 'antd';
import "./index.css";
import { Ajax } from "../../utils/common";

class EditorModel extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        submitLoading: false
    }

    addSubmit = async () => {
        let data = this.props.data;
        let result = await Ajax({
            url: '/customer/' + data.id,
            method: "put",
            data,
            before: () => {
                this.setState({
                    submitLoading: true
                })
            },
            complete: () => {
                this.setState({
                    submitLoading: false
                })
            }
        });

        if (result.code != 0) {
            return alert(result.msg);
        }

        this.props.cancel();
    }

    render() {
        let data = this.props.data;

        return (
            <Modal
                title="编辑客户"
                visible={this.props.visible}
                onCancel={this.props.cancel}
                footer={[
                    <Button loading={this.state.submitLoading} key="submit" type="primary" onClick={this.addSubmit}>
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
                电话&nbsp;: <Input
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