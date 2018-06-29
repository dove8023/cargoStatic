/*
 * @Author: Mr.He 
 * @Date: 2018-06-04 19:54:08 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-06-18 21:55:39
 * @content: 
 */

import React, { Component } from "react";
import { Button, Table, Modal, Select, List, Input, InputNumber, Icon } from "antd";
import * as uuid from "uuid";
import axios from "axios";
import moment from "moment";
const Option = Select.Option;
const InputGroup = Input.Group;
import "./index.css";

export default class TakeGood extends Component {
    constructor() {
        super();

        this.state = {
            data: [],

            loading: false,
            /* dialog */
            dialog: {

            },
            visible: false,
            time: moment().format("MM-DD HH:mm")
        }
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
                    <li>
                        <span>1.</span>
                        <InputGroup compact>
                            <Icon type="close-circle" className="take-good-list-close" />
                            <Select style={{ "width": 100 }} placeholder="品种">
                                <Option value="Option1">Option1</Option>
                                <Option value="Option2">Option2</Option>
                            </Select>
                            <InputNumber placeholder="单价" />
                            <InputNumber placeholder="重量" />
                        </InputGroup>

                        <span className="fr">
                            金额: <strong>689</strong>¥
                        </span>
                    </li>
                </ol>
                <div className="clear mb10">
                    <Button className="fr color-black" type="default" disabled>
                        总金额 : <strong>1298.00</strong> 元
                    </Button>
                    <Button type="default">
                        添加一项
                    </Button>
                </div>
                <Button type="primary" className="fr">提交</Button>
            </section>
        )
    }
}