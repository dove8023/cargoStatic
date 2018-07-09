/*
 * @Author: Mr.He 
 * @Date: 2018-07-01 21:44:00 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-07-09 08:26:08
 * @content what is the content of this file. */


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