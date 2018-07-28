/*
 * @Author: Mr.He 
 * @Date: 2018-07-08 21:11:38 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-07-16 22:28:46
 * @content what is the content of this file. */

import React, { Component } from "react";
import { Button, Select, Input, InputNumber, Icon } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
const Option = Select.Option;
const InputGroup = Input.Group;
import "./index.css";
import store from "../../store";
import { updateGoodsOrder, deleteGoodsOrder } from "../../actions/takeGoodOrder";

class TakeGoodItem extends Component {
    constructor(props) {
        super(props);
    }

    typeChange = async (val) => {
        let currentItem;
        for (let item of this.props.types) {
            if (item.id == val) {
                currentItem = item;
                break;
            }
        }

        store.dispatch(updateGoodsOrder(this.props.index, {
            ...this.props.data,
            price: currentItem.price,
            typeId: currentItem.id
        }));
    }

    priceChange = async (val) => {
        store.dispatch(updateGoodsOrder(this.props.index, {
            ...this.props.data,
            price: val
        }));
    }

    weightChange = async (val) => {
        store.dispatch(updateGoodsOrder(this.props.index, {
            ...this.props.data,
            weight: val
        }));
    }

    deleteItem = () => {
        store.dispatch(deleteGoodsOrder(this.props.index))
    }

    render() {
        let itemData = this.props.data;
        return (
            <li>
                <span>{this.props.index + 1}.</span>
                <InputGroup compact>
                    <Icon type="close-circle" onClick={this.deleteItem} className="take-good-list-close" />
                    <Select style={{ "width": 100 }} onChange={this.typeChange} placeholder="品种">
                        {this.props.types.map((item, index) => {
                            return (
                                <Option key={index} value={item.id}>{item.name}</Option>
                            )
                        })}
                    </Select>
                    <InputNumber onChange={this.priceChange} placeholder="单价(元/kg)" value={itemData.price} />
                    <InputNumber onChange={this.weightChange} placeholder="重量(kg)" value={itemData.weight} />
                </InputGroup>

                <span className="fr">
                    金额:
                    <strong>{itemData.amount}</strong>¥
                </span>
            </li>
        )
    }
}

TakeGoodItem.propTypes = {
    types: PropTypes.array.isRequired,
    index: PropTypes.number.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    let { rows } = state.types;
    return {
        types: rows
    }
}

export default connect(mapStateToProps)(TakeGoodItem);