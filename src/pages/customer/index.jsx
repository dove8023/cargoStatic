/*
 * @Author: Mr.He 
 * @Date: 2018-06-10 12:22:21 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-09-24 22:57:39
 * @content what is the content of this file. */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { List, Avatar, Button, Spin, Modal, InputNumber, Input, Table } from 'antd';
import "./index.css";
import store from "../../store";
import { fetchType, updateType, addType } from "../../actions/types";
import { Ajax } from "../../utils/common";
import EditorModel from "./editorModel.jsx";

class Customer extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        currentData: {},
        addVisible: false,
        editorModel: false,
        editorModelData: {},
        list: [],
        loading: false,
        loadMore: true,
        addSubmitLoading: false,
        addCustomer: {}
    }

    async componentDidMount() {
        let result = await Ajax({
            url: "/customer",
        })
        console.log(result);
        if (result.code != 0) {
            return alert(result.msg);
        }
        this.setState({
            list: result.data.rows
        })
    }

    del = async (item) => {
        let check = confirm("客户删除后不可恢复(客户之前的记录仍将保存)");
        if (!check) {
            return;
        }

        let result = await Ajax({
            url: "/customer/" + item.id,
            method: "delete",
            before: () => {
                this.setState({
                    loading: true
                })
            },
            complete: () => {
                this.setState({
                    loading: false
                })
            }
        });

        if (result.code != 0) {
            alert(result.msg)
        } else {
            this.componentDidMount()
        }
    }

    tapAdd = () => {
        this.setState({
            addVisible: true
        })
    }

    addCancel = () => {
        this.setState({
            addVisible: false
        })
    }

    addChange = (key, value) => {
        if (!value) {
            return;
        }
        value = value.trim();
        let addCustomer = this.state.addCustomer;
        addCustomer[key] = value;
        this.setState({
            addCustomer
        })
    }

    addSubmit = async () => {
        let data = this.state.addCustomer;
        if (!data.name) {
            return alert("客户名称是必须的");
        }

        let result = await Ajax({
            url: "/customer",
            before: () => {
                this.setState({ addSubmitLoading: true })
            },
            complete: () => {
                this.setState({ addSubmitLoading: false })
            },
            method: "post",
            data
        })

        if (result.code == 0) {
            this.setState({
                addVisible: false
            }, () => {
                this.componentDidMount()
            })
        } else {
            alert(result.msg);
        }
    }

    editor(item) {
        console.log(1111, item)
        this.setState({
            editorModel: true,
            editorModelData: item
        })
    }

    render() {
        return (
            <section>
                <h2>
                    客户管理
                </h2>
                <Button type="primary" onClick={this.tapAdd}>
                    客户添加
                </Button>

                <List
                    className=""
                    loading={this.state.loading}
                    itemLayout="horizontal"
                    loadMore={this.state.loadMore}
                    dataSource={this.state.list}
                    renderItem={(item, index) => (
                        <List.Item actions={[<a onClick={() => { this.editor(item) }}>编辑</a>, <a onClick={() => { this.del(item) }}>删除</a>]}>
                            {index + 1}.
                            <div className="pl5">
                                姓名: {item.name}
                                <br />
                                地址: {item.address || '--'}
                                <br />
                                手机: {item.mobile || '--'}
                                <br />
                                其它: {item.other || '--'}
                            </div>
                        </List.Item>
                    )}
                />

                <Modal
                    title="添加客户"
                    visible={this.state.addVisible}
                    onCancel={this.addCancel}
                    footer={[
                        <Button key="submit" type="primary" loading={this.state.addSubmitLoading} onClick={this.addSubmit}>
                            添加
                        </Button>
                    ]}
                    destroyOnClose={true}
                >
                    姓名*:<Input onChange={(e) => {
                        this.addChange('name', e.target.value)
                    }} style={{ "width": "80%", "marginBottom": "5px" }}></Input>
                    <br />
                    电话&nbsp;: <Input onChange={(e) => {
                        this.addChange('mobile', e.target.value)
                    }} style={{ "width": "80%", "marginBottom": "5px" }}></Input>
                    <br />
                    地址&nbsp;: <Input onChange={(e) => {
                        this.addChange('address', e.target.value)
                    }} style={{ "width": "80%", "marginBottom": "5px" }}></Input>
                    <br />
                    其它&nbsp;: <Input onChange={(e) => {
                        this.addChange('other', e.target.value)
                    }} style={{ "width": "80%", "marginBottom": "5px" }}></Input>
                </Modal>

                <EditorModel visible={this.state.editorModel} cancel={() => {
                    this.setState({
                        editorModel: false
                    })
                }} data={this.state.editorModelData} />
            </section>
        );
    }
}


const mapStateToProps = (state) => {
    // let { rows, loading } = state.customers;
    return {}
}

export default connect(mapStateToProps)(Customer);