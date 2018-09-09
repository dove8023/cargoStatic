/*
 * @Author: Mr.He 
 * @Date: 2018-06-04 19:54:08 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-06-07 14:51:21
 * @content: 
 */

import React, { Component } from "react";
import { Button, Table, Modal } from "antd";
import * as uuid from "uuid";
import axios from "axios";
import moment from "moment-timezone";
import config, { BACK_SYSTEM_URL } from "../../../config/config";


const columns = [{
    title: 'Name',
    dataIndex: 'alipay.realName',
}, {
    title: '支付宝账号',
    dataIndex: 'alipay.account',
}, {
    title: '总数',
    dataIndex: 'totalSuply',
}, {
    title: '单价/¥',
    dataIndex: 'price',
}, {
    title: '剩余',
    dataIndex: 'restSuply',
}, {
    title: '创建日期',
    dataIndex: 'createdAt',
    render(text, record, index) {
        record.datetime = moment(text).tz("Asia/ShangHai").format("YYYY-MM-DD hh:mm:ss");
        return record.datetime;
    }
}, {
    title: '状态',
    dataIndex: 'status',
    render(text, record, index) {
        // 1新建待审核 2正常 3下架 4非法

        switch (text) {
            case 1:
                return "新建待审核";
            case 2:
                return "正常";
            case 3:
                return "下架";
            default:
                return "非法"
        }
    }
}];

export default class Trade extends Component {
    constructor() {
        super();

        this.state = {
            data: [],
            /* 分页相关 */
            pagination: {
                pageSize: 20,
                page: 1,
                current: 1,
                total: 0
            },
            loading: false,
            /* 查询数据状态 */
            status: 1,

            /* dialog */
            dialog: {
                visible: false,
                record: {
                    alipay: {}
                }
            }
        }

        let keys = ["fetch", "fetchDefault", "fetchNorma", "fetchDown", "fetchIllegitmacy", "fetchAll", "paginationChange", "handleOk", "handleCancel"];
        for (let key of keys) {
            this[key] = this[key].bind(this);
        }
    }

    handleOk() {
        let _this = this;
        axios({
            url: BACK_SYSTEM_URL + "/v1/trade",
            method: "put",
            data: {
                tradeId: this.state.dialog.record._id
            }
        }).then((result) => {
            let dialog = _this.state.dialog;
            dialog.visible = false;
            _this.fetch();
            _this.setState({
                dialog
            })
        }, (err, msg) => {
            console.log(err, msg);
        })
    }
    handleCancel() {
        let dialog = this.state.dialog;
        dialog.visible = false;
        this.setState({
            dialog
        })
    }

    paginationChange(pagination, filters, sorter) {
        // console.log(pagination, filters, sorter);
        this.setState({
            pagination
        });
        setTimeout(this.fetch, 0)
    }

    rowClick(record) {
        if (record.status != 1) {
            return;
        }

        this.setState({
            dialog: {
                visible: true,
                record: record
            }
        })
    }

    fetch(status) {
        let _this = this;

        if (!status) {
            status = this.state.status
        }
        this.setState({
            loading: true,
            status
        })

        let { current, pageSize } = this.state.pagination;

        let options = {
            url: BACK_SYSTEM_URL + "/v1/trade",
            method: "get",
            data: {
                page: current - 1,
                limit: pageSize,
                status
            },
            responseType: "json"
        };

        axios.get(options.url, {
            params: options.data
        }).then((resp) => {
            resp = resp.data;
            if (resp.code != 0) {
                return
            }
            _this.setState({
                data: resp.data.rows,
                loading: false,
                pagination: {
                    total: resp.data.count,
                    page: Math.ceil(resp.data.count / pageSize),
                    current,
                    pageSize
                }
            });
        }).catch((err, msg) => {
            console.log(err, msg);
        }).finally(() => {
            _this.setState({
                loading: false
            })
        })
    }

    fetchDefault() {
        let pagination = this.state.pagination;
        pagination.current = 1;
        this.setState({
            pagination
        })
        this.fetch(1)
    }
    fetchNorma() {
        let pagination = this.state.pagination;
        pagination.current = 1;
        this.setState({
            pagination
        })
        this.fetch(2);
    }
    fetchDown() {
        let pagination = this.state.pagination;
        pagination.current = 1;
        this.setState({
            pagination
        })
        this.fetch(3);
    }
    fetchIllegitmacy() {
        let pagination = this.state.pagination;
        pagination.current = 1;
        this.setState({
            pagination
        })
        this.fetch(4);
    }
    fetchAll() {
        let pagination = this.state.pagination;
        pagination.current = 1;
        this.setState({
            pagination
        })
        this.fetch(-1);
    }
    componentDidMount() {
        this.fetch();
    }

    render() {
        return (
            <section>
                <h1>
                    卖方挂单列表
                 </h1>
                <div className="mb10">
                    <Button style={{ 'marginRight': '10px' }} onClick={this.fetchDefault} size="large" type="default">待审核(默认)</Button>
                    <Button style={{ 'marginRight': '10px' }} onClick={this.fetchNorma} size="large" type="default">正常</Button>
                    <Button style={{ 'marginRight': '10px' }} onClick={this.fetchDown} size="large" type="default">下架</Button>
                    <Button style={{ 'marginRight': '10px' }} onClick={this.fetchIllegitmacy} size="large" type="default">非法</Button>
                    <Button style={{ 'marginRight': '10px' }} onClick={this.fetchAll} size="large" type="default">全部</Button>
                </div>
                <Table columns={columns}
                    rowKey={record => record._id}
                    dataSource={this.state.data}
                    pagination={this.state.pagination}
                    loading={this.state.loading}
                    onChange={this.paginationChange}
                    onRow={(record) => {
                        return {
                            onClick: () => {
                                this.rowClick(record)
                            }
                        }
                    }}
                />

                <Modal
                    title="卖单确认操作"
                    visible={this.state.dialog.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >

                    <h3>用户信息</h3>
                    <p>
                        姓名: <strong>{this.state.dialog.record.alipay.realName}</strong>
                        <br />
                        支付宝账号:  <strong>{this.state.dialog.record.alipay.account}</strong>
                        <br />
                        卖出总量:  <strong>{this.state.dialog.record.totalSuply}</strong>
                        <br />
                        日期: <strong>{this.state.dialog.record.datetime}</strong>
                        <br />
                        单价: <strong>{this.state.dialog.record.price} ¥/tik</strong>
                    </p>
                    <hr />
                    <p>1.请检查该用户在同一时段是否存在多次相同卖出记录。</p>
                    <p>2.请检查用户的支付宝账号。</p>
                    <h4>点击ok后，该卖出单即生效。用户在交易列表即可见</h4>

                </Modal>
            </section>
        )
    }
}