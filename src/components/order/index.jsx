/*
 * @Author: Mr.He 
 * @Date: 2018-07-26 12:22:21 
 * @Last Modified by: he@whaleblue.design
 * @Last Modified time: 2018-08-07 22:32:21
 * @content what is the content of this file. */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { List, Avatar, Button, Spin, Modal, InputNumber, Input } from 'antd';
import "./index.css";
import store from "../../store";
import { fetchOrder } from "../../actions/order";
import { Ajax } from "../../utils/common"

class Orders extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        visible: false,
        modalLoading: false,
        orderDetail: {}
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
        this.setState({
            orderDetail: orderId,
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
                                时间 : <strong>{item.created_at}</strong>
                            </div>
                            <p>
                                客户 : {item.customerId}
                                <br />
                                操作员: {item.operaterId}

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
                    onOk={this.handleCancel}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>取消</Button>,
                        <Button key="submit" type="primary" onClick={this.handleCancel}>确认</Button>
                    ]}
                    destroyOnClose={true}
                >
                    <div className="mb10">
                        名称：<span>{this.state.orderDetail}</span>
                    </div>
                    <div>
                        价格：<span>{this.state.orderDetail}</span>
                    </div>
                </Modal>
            </section>
        );
    }
}

Orders.propTypes = {
    listData: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    count: PropTypes.number.isRequired,
    orderDetail: PropTypes.object
}

const mapStateToProps = (state) => {
    let { rows, loading, count, orderDetail } = state.orders;
    return {
        listData: rows,
        count,
        loading,
        orderDetail
    }
}

export default connect(mapStateToProps)(Orders);