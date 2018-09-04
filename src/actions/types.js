/*
 * @Author: Mr.He 
 * @Date: 2018-07-01 21:44:00 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-09-02 22:30:54
 * @content what is the content of this file. */

import { Ajax } from "../utils/common";

export let getType = async (id) => {
    let result = await Ajax({
        url: "/types/" + id,
    });

    if (result.code != 0) {
        return alert(result.msg);
    }
    return result.data;
}

let getTypes = async () => {
    let result = await Ajax({
        url: "/types",
    });

    if (result.code != 0) {
        return alert(result.msg);
    }
    return result.data;
}

let updateTypes = async (id, price, name) => {
    let result = await Ajax({
        url: "/types/" + id,
        method: "put",
        data: {
            price,
            name
        }
    });
    if (result.code != 0) {
        return alert(result.msg);
    }

    return result.data;
}

let addTypes = async (price, name) => {
    let result = await Ajax({
        url: "/types/",
        method: "POST",
        data: {
            price,
            name
        }
    });
    if (result.code != 0) {
        return alert(result.msg);
    }

    return result.data;
}

export const fetchType = () => {
    return {
        type: "FETCH_TYPE",
        payload: getTypes()
    }
}

export const updateType = (...args) => {
    return {
        type: "UPDATE_TYPE",
        payload: updateTypes(...args)
    }
}

export const addType = (...args) => {
    return {
        type: "ADD_TYPE",
        payload: addTypes(...args)
    }
}