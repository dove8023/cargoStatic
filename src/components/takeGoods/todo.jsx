/*
 * @Author: Mr.He 
 * @Date: 2018-07-08 21:11:38 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-07-09 08:26:07
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

        this.state = {
            data: this.props.data,
            index: this.props.index
        }
    }

    componentWillMount() { }

    typeChange = async (val) => {
        let currentItem;
        for (let item of this.props.types) {
            if (item.id == val) {
                currentItem = item;
                break;
            }
        }

        this.priceChange(currentItem.price);
    }

    priceChange = async (val) => {
        await this.setState({
            data: {
                ...this.state.data,
                price: val,
                amount: val * this.state.data.weight
            }
        })

        store.dispatch(updateGoodsOrder(this.state.index, this.state.data));
    }

    weightChange = async (val) => {
        await this.setState({
            data: {
                ...this.state.data,
                weight: val,
                amount: val * this.state.data.price
            }
        })

        store.dispatch(updateGoodsOrder(this.state.index, this.state.data));
    }

    deleteItem = () => {
        store.dispatch(deleteGoodsOrder(this.state.index))
    }

    render() {
        let itemData = this.state.data;
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
                    <InputNumber onChange={this.priceChange} placeholder="单价" value={itemData.price} />
                    <InputNumber onChange={this.weightChange} placeholder="重量" value={itemData.weight} />
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