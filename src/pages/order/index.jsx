/*
 * @Author: Mr.He 
 * @Date: 2018-07-26 12:22:21 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-09-04 22:08:41
 * @content what is the content of this file. */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { List, Avatar, Button, Spin, Modal, InputNumber, Input } from 'antd';
import "./index.css";
import store from "../../store";
import { fetchOrder, getOrderDetail } from "../../actions/order";
import { Ajax } from "../../utils/common"
import moment from "moment";

class Orders extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        visible: false,
        modalLoading: false,
        orderDetail: {
            goods: []
        }
    }

    componentDidMount() {
        store.dispatch(fetchOrder())
    }

    handleCancel = () => {
        this.setState({
            visible: false
        })
    }

    settings = async (orderId) => {
        /* get the order */
        let orderDetail = await getOrderDetail(orderId);
        // console.log(111111, orderDetail)
        this.setState({
            orderDetail,
            visible: true
        })
    }

    render() {
        return (
            <section>
                <h2>
                    收货记录
                </h2>
                <List
                    className="demo-loadmore-list"
                    loading={this.props.loading}
                    itemLayout="horizontal"
                    dataSource={this.props.listData}
                    renderItem={(item, index) => (
                        <div className="list">
                            <div className="fl mr10">
                                {index + 1}. &nbsp;
                                金额 : <strong>{item.totalAmount}</strong>
                                <br />
                                时间 : {moment(item.created_at).format("MM-DD HH:mm")}
                            </div>
                            <p>
                                客户 : {item.customer.name}
                                <br />
                                {/* 操作员: {item.operaterId} */}

                                <Button type="default" onClick={() => {
                                    this.settings(item.id)
                                }} className="fr">
                                    详情
                                </Button>
                            </p>
                        </div>
                    )}
                />
                <Modal
                    title="订单详情"
                    visible={this.state.visible}
                    onOk={false}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>取消</Button>,
                        <Button key="submit" type="primary" onClick={this.handleCancel}>确认</Button>
                    ]}
                    destroyOnClose={true}
                >

                    客户：{this.state.orderDetail.customerId}
                    <br />
                    时间：{moment(this.state.orderDetail.created_at).format("YYYY-MM-DD HH:mm")}
                    <br />
                    卖货详情:
                    <hr />
                    <ul>
                        {this.state.orderDetail.goods.map((item, index) => {
                            return (
                                <li className="order-detail-item">
                                    <span className="special">
                                        {index + 1}.
                                    </span>
                                    <span>
                                        品名: &nbsp;
                                        {item.type.name}
                                    </span>
                                    <span>
                                        单价: &nbsp;
                                        {item.price} ¥/kg
                                    </span>
                                    <span className="special">
                                        &nbsp;
                                    </span>
                                    <span>
                                        净重: &nbsp;
                                        {item.weight} kg
                                    </span>
                                    <span>
                                        金额: &nbsp;&nbsp;
                                        {item.amount} ¥
                                    </span>
                                </li>
                            )
                        })}
                    </ul>
                </Modal>
            </section>
        );
    }
}

Orders.propTypes = {
    listData: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    count: PropTypes.number.isRequired,
}

const mapStateToProps = (state) => {
    let { rows, loading, count } = state.orders;
    return {
        listData: rows,
        count,
        loading
    }
}

export default connect(mapStateToProps)(Orders);