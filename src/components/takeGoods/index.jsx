/*
 * @Author: Mr.He 
 * @Date: 2018-06-04 19:54:08 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-07-09 22:11:50
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
import { addGoodsOrder } from "../../actions/takeGoodOrder";
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
                        console.log("what", item)
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
                <Button type="primary" className="fr">提交</Button>
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
    console.log(111111111111111, takeGoodOrder)
    return {
        types: rows,
        takeGoodOrder
    }
}

export default connect(mapStateToProps)(TakeGood);