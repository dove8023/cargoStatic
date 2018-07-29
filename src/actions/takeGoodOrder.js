/*
 * @Author: Mr.He 
 * @Date: 2018-07-01 21:44:00 
 * @Last Modified by: he@whaleblue.design
 * @Last Modified time: 2018-07-24 23:12:04
 * @content what is the content of this file. */

import store from "../store";
import { Ajax } from "../utils/common";


export const addGoodsOrder = (...args) => {
    return {
        type: "ADD_GOODS_ORDER"
    }
}

export const updateGoodsOrder = (...args) => {
    return {
        type: "UPDATE_GOODS_ORDER",
        payload: {
            index: args[0],
            item: args[1]
        }
    }
}

export const deleteGoodsOrder = (...args) => {
    return {
        type: "DELETE_GOODS_ORDER",
        payload: {
            index: args[0]
        }
    }
}



const submitGoodsOrderFn = async () => {
    let { takeGoodOrder } = store.getState();

    let result = await Ajax({
        url: "/order",
        method: "POST",
        data: takeGoodOrder
    })
    if (result.code == 0) {
        return true;
    } else {
        alert(result.msg)
        console.log(result);
        return false;
    }
}


export const submitGoodsOrder = () => {
    return {
        type: "SUBMIT_GOODS_ORDER",
        payload: submitGoodsOrderFn()
    }
}