/*
 * @Author: Mr.He 
 * @Date: 2018-09-27 22:03:11 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-09-27 23:05:46
 * @content: 客户搜索组件 */


import React, { Component } from "react";
import { Select } from "antd";
const Option = Select.Option;
import { Ajax } from "../utils/common";


export default class SearchCustomer extends Component {
    state = {
        data: [],
        value: undefined,
    }

    handleSearch = async (value) => {
        if (!value) {
            return;
        }
        console.log("value: ", value)
        let result = await Ajax({
            url: "/customer/search",
            params: {
                keyword: value
            }
        });
        if (result.code !== 0) {
            return alert(result.msg);
        }

        let data = result.data;
        if (!data.length) {
            data.push({
                type: 'add',
                id: Math.random(),
                name: '添加客户:' + value
            })
        }

        this.setState({
            data: result.data
        })
    }

    handleChange = (value) => {
        console.log(11111111, value);
        this.setState({ value });
    }

    render() {
        const options = this.state.data.map(d => <Option key={d.id}>{d.name}</Option>);
        return (
            <Select
                showSearch
                value={this.state.value}
                placeholder={this.props.placeholder}
                style={this.props.style}
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onSearch={this.handleSearch}
                onChange={this.handleChange}
                notFoundContent={null}
            >
                {options}
            </Select>
        );
    }
}
