/*
 * @Author: Mr.He 
 * @Date: 2018-06-10 12:22:21 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-07-03 23:52:26
 * @content what is the content of this file. */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { List, Avatar, Button, Spin, Modal, InputNumber, Input } from 'antd';
import { Ajax } from "../../utils/common";
import "./index.css";
import store from "../../store";
import { fetchType, updateType } from "../../actions/index";

class Types extends Component {
    constructor(props) {
        super(props);
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

    handleOk = async () => {
        let { modalData: data } = this.state;
        if (Number(data.price) <= 0 || !data.name) {
            alert("请输入正确的数据");
            return;
        }

        store.dispatch(updateType(this.state.currentData.id, data.price, data.name));

        // let result = await Ajax({
        //     url: data.method == "put" ? "/types/" + this.state.currentData.id : "/types",
        //     method: data.method,
        //     data,
        //     before: () => {
        //         this.setState({
        //             modalLoading: true
        //         })
        //     },
        //     complete: () => {
        //         this.setState({
        //             modalLoading: false
        //         });
        //     }
        // });
        // if (result.code != 0) {
        //     return alert(result.msg);
        // }

        // this.setState({
        //     visible: false
        // });
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

    componentWillMount() { }
    componentDidMount() {
        store.dispatch(fetchType())
        // store.subscribe(() => {
        //     let state = store.getState().types;
        //     this.setState({
        //         listData: state.rows,
        //         loading: state.loading
        //     })
        // })
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

Types.propTypes = {
    listData: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
    let { rows } = state.types;
    return {
        listData: rows
    }
}

export default connect(mapStateToProps)(Types);