/*
 * @Author: Mr.He 
 * @Date: 2018-07-01 21:44:00 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-09-02 22:31:36
 * @content what is the content of this file. */

import { Ajax } from "../utils/common";
import { getStaff } from "./staff";
import { getCustomer } from "./customer";
import { getType } from "./types";

let getOrders = async () => {
    let result = await Ajax({
        url: "/order",
    });

    if (result.code != 0) {
        return alert(result.msg);
    }

    // get the operate and the customer
    let ps = result.data.rows.map(async (item) => {
        // item.staff = await getStaff(item.operaterId);
        item.customer = await getCustomer(item.customerId);
    });
    await Promise.all(ps)

    return result.data;
}

export const fetchOrder = () => {
    return {
        type: "FETCH_ORDER",
        payload: getOrders()
    }
}

export const getOrderDetail = async (id) => {
    let result = await Ajax({
        url: "/order/" + id
    })

    if (result.code != 0) {
        return alert(result.msg);
    }

    // 处理数据
    let ps = result.data.goods.map(async (item) => {
        item.type = await getType(item.typeId);
    })
    await Promise.all(ps);
    return result.data;
}

export const fetchOrderDetail = (orderId) => {
    return {
        type: "FETCH_ORDER_DETAIL",
        payload: getOrderDetail(orderId)
    }
}