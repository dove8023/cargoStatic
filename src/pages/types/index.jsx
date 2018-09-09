/*
 * @Author: Mr.He 
 * @Date: 2018-06-10 12:22:21 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-07-04 23:11:22
 * @content what is the content of this file. */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { List, Avatar, Button, Spin, Modal, InputNumber, Input } from 'antd';
import "./index.css";
import store from "../../store";
import { fetchType, updateType, addType } from "../../actions/types";

class Types extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        currentData: {},
        visible: false,
        modalLoading: false,
    }

    handleCancel = () => {
        this.setState({
            visible: false
        })
    }

    handleOk = async () => {
        let { name, price, id } = this.state.currentData;
        price = Number(price);

        if (!name) {
            return alert("名称不合法");
        }

        if (!price || price <= 0) {
            return alert("价格不合法");
        }

        this.setState({
            modalLoading: true
        });

        if (this.state.currentData.type == "add") {
            await store.dispatch(addType(price, name));
        } else {
            await store.dispatch(updateType(id, price, name));
        }

        this.setState({
            modalLoading: false,
            visible: false
        })
    }

    settings = (record) => {
        this.setState({
            currentData: record,
            visible: true
        })
    }

    typeAdd = () => {
        this.setState({
            visible: true,
            currentData: {
                type: "add"
            }
        })
    }

    typeNameChange = (e) => {
        this.setState({
            currentData: {
                ...this.state.currentData,
                name: e.target.value
            }
        })
    }

    typePriceChange = (e) => {
        this.setState({
            currentData: {
                ...this.state.currentData,
                price: e
            }
        })
    }

    componentDidMount() {
        store.dispatch(fetchType())
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
                    loading={this.props.loading}
                    itemLayout="horizontal"
                    dataSource={this.props.listData}
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
                    title={this.state.currentData.type == "add" ? "品种添加" : "品种详情"}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>取消</Button>,
                        <Button key="submit" type="primary" loading={this.state.modalLoading} onClick={this.handleOk}>
                            {this.state.currentData.type == "add" ? "确认添加" : "确认修改"}
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

Types.propTypes = {
    listData: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
    let { rows, loading } = state.types;
    return {
        listData: rows,
        loading
    }
}

export default connect(mapStateToProps)(Types);