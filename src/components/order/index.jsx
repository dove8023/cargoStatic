/*
 * @Author: Mr.He 
 * @Date: 2018-07-26 12:22:21 
 * @Last Modified by: he@whaleblue.design
 * @Last Modified time: 2018-08-02 23:19:25
 * @content what is the content of this file. */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { List, Avatar, Button, Spin, Modal, InputNumber, Input } from 'antd';
import "./index.css";
import store from "../../store";
import { fetchOrder } from "../../actions/order";

class Orders extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        currentData: {},
        visible: false,
        modalLoading: false,
    }

    componentDidMount() {
        store.dispatch(fetchOrder())
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

                                <Button type="default">详情</Button>
                            </p>
                        </div>
                    )}
                />
            </section>
        );
    }
}

Orders.propTypes = {
    listData: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    count: PropTypes.number.isRequired
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