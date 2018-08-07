/*
 * @Author: Mr.He 
 * @Date: 2018-07-01 21:44:00 
 * @Last Modified by: he@whaleblue.design
 * @Last Modified time: 2018-08-02 23:13:12
 * @content what is the content of this file. */

import { Ajax } from "../utils/common";

let getOrders = async () => {
    let result = await Ajax({
        url: "/order",
    });

    if (result.code != 0) {
        return alert(result.msg);
    }

    // get the operate and the customer

    return result.data;
}

export const fetchOrder = () => {
    return {
        type: "FETCH_ORDER",
        payload: getOrders()
    }
}

let getOrderDetail = async (id) => {
    let result = await Ajax({
        url: "/order/" + id
    })

    if (result.code != 0) {
        return alert(result.msg);
    }

    return result.data;
}

export const fetchOrderDetail = (orderId) => {
    return {
        type: "FETCH_ORDER_DETAIL",
        payload: getOrderDetail(orderId)
    }
}