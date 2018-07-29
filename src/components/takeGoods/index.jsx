/*
 * @Author: Mr.He 
 * @Date: 2018-06-04 19:54:08 
 * @Last Modified by: he@whaleblue.design
 * @Last Modified time: 2018-07-24 23:27:56
 * @content: 
 */

import React, { Component } from "react";
import { Button, Select, Input, InputNumber, Icon } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
const Option = Select.Option;
const InputGroup = Input.Group;
import "./index.css";
import { fetchType } from "../../actions/types";
import { addGoodsOrder, submitGoodsOrder } from "../../actions/takeGoodOrder";
import store from "../../store";
import TakeGoodItem from "./todo.jsx";

class TakeGood extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],

            loading: false,
            /* dialog */
            dialog: {

            },
            visible: false,
            time: moment().format("MM-DD HH:mm")
        }

        console.log(this.props);
    }

    componentWillMount() {
        store.dispatch(fetchType())
    }

    addItem = () => {
        store.dispatch(addGoodsOrder())
    }

    submit = async () => {
        if (!this.props.takeGoodOrder.totalAmount) {
            return alert("请输入数据");
        }
        let data = this.props.takeGoodOrder.list;
        for (let i = 0; i < data.length; i++) {
            if (!data[i].amount || !data[i].typeId) {
                return alert(`数据不全`)
            }
        }

        await store.dispatch(submitGoodsOrder())
        alert("数据保存成功");
    }

    render() {

        return (
            <section>
                <h2>
                    收货界面
                 </h2>
                <div className="clear">
                    <div className="fr">
                        <Input style={{ "width": 120 }} placeholder="客户姓名" />
                    </div>
                    <div className="fr mr10">
                        <span>
                            {this.state.time}
                        </span>
                    </div>
                </div>
                <ol className="take-good-list">
                    {this.props.takeGoodOrder.list.map((item, index) => {
                        return (
                            <TakeGoodItem key={index} index={index} data={item} />
                        )
                    })}
                </ol>
                <div className="clear mb10">
                    <Button className="fr color-black" type="default" disabled>
                        总金额 : <strong>{this.props.takeGoodOrder.totalAmount}</strong> 元
                    </Button>
                    <Button type="default" onClick={this.addItem}>
                        添加一项
                    </Button>
                </div>
                <Button type="primary" className="fr" onClick={this.submit}>提交</Button>
            </section>
        )
    }
}

TakeGood.propTypes = {
    types: PropTypes.array.isRequired,
    takeGoodOrder: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    let { rows } = state.types;
    let takeGoodOrder = state.takeGoodOrder;
    return {
        types: rows,
        takeGoodOrder
    }
}

export default connect(mapStateToProps)(TakeGood);