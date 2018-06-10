/*
 * @Author: Mr.He 
 * @Date: 2018-06-10 12:22:21 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-06-10 23:37:58
 * @content what is the content of this file. */

import React, { Component } from "react";
import { List, Avatar, Button, Spin, Modal, InputNumber, Input } from 'antd';
import { Ajax } from "../../utils/common";
import "./index.css";

export default class Types extends Component {
    constructor() {
        super();
    }

    state = {
        loading: false,
        listData: [],
        currentData: {},
        visible: false,
        modalLoading: false,
        modalData: {
            method: "put"
        }
    }

    handleCancel = () => {
        this.setState({
            visible: false
        })
    }

    handleOk = () => {
        let { modalData: data } = this.state;
        if (Number(data.price) <= 0 || !data.name) {
            alert("请输入正确的数据");
            return;
        }

        this.setState({
            modalLoading: true
        });
        Ajax({
            url: data.method == "put" ? "/types/" + this.state.currentData.id : "/types",
            method: data.method,
            headers: {
                token: "ed6c3776cdfd2c856f28dde23c05eb56"
            },
            data
        }).then((result) => {
            if (result.code != 0) {
                return alert(result.msg);
            }

            this.setState({
                modalLoading: false,
                visible: false
            });
            this.fetchList();
        }).catch((err) => {
            alert(err.message);
        }).finally(() => {
            this.setState({
                modalLoading: false
            })
        })
    }

    fetchList = (page = 0, limit = 20) => {
        this.state.loading = true;
        Ajax({
            url: "/types",
            headers: {
                token: "ed6c3776cdfd2c856f28dde23c05eb56"
            },
            params: {
                page,
                limit
            }
        }).then((result) => {
            this.setState({
                listData: result.data.rows
            })
        }).catch((err, msg) => {
            // console.log(err, msg);
            alert(err.message)
        }).finally(() => {
            // console.log("finally");
            this.setState({
                loading: false
            })
        })
    }

    settings = (record) => {
        this.setState({
            currentData: record,
            visible: true,
            modalData: {
                name: record.name,
                price: record.price,
                method: "put"
            }
        })
    }

    typeNameChange = (e) => {
        let modalData = this.state.modalData;
        modalData.name = e.target.value;
        this.setState({
            modalData
        })
    }

    typePriceChange = (e) => {
        let modalData = this.state.modalData;
        modalData.price = e;
        this.setState({
            modalData
        })
    }

    typeAdd = () => {
        this.setState({
            modalData: {
                method: "post"
            },
            visible: true
        })
    }

    componentDidMount() {
        this.fetchList();
    }

    render() {
        return (
            <section>
                <h2>
                    品种管理
                </h2>
                <Button type="primary" onClick={this.typeAdd}>
                    添加品种
                </Button>
                <List
                    className="demo-loadmore-list"
                    loading={this.state.loading}
                    itemLayout="horizontal"
                    dataSource={this.state.listData}
                    renderItem={(item, index) => (
                        <div className="list">
                            <div className="fl">
                                {index + 1}. &nbsp;
                                名称 : <strong>{item.name}</strong>
                                <br />
                                价格 : <strong>{item.price}</strong> ¥/kg
                            </div>
                            <p></p>
                            <Button type="default" onClick={() => {
                                this.settings(item)
                            }} className="fr">
                                修改
                            </Button>
                        </div>
                    )}
                />

                <Modal
                    title="品种详情"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>取消</Button>,
                        <Button key="submit" type="primary" loading={this.modalLoading} onClick={this.handleOk}>
                            确认修改
                        </Button>
                    ]}
                    destroyOnClose={true}
                >
                    <div className="mb10">
                        名称 : <Input defaultValue={this.state.currentData.name} onChange={this.typeNameChange} style={{ "width": "60%" }}></Input>
                    </div>
                    <div>
                        价格 : <InputNumber defaultValue={this.state.currentData.price} onChange={this.typePriceChange} /> 元/kg
                    </div>
                </Modal>
            </section>
        );
    }
}