/*
 * @Author: Mr.He 
 * @Date: 2018-07-01 21:44:00 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-07-03 23:28:06
 * @content what is the content of this file. */

import { Ajax } from "../utils/common";


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

export const fetchType = () => {
    return {
        type: "FETCH_TYPE",
        payload: getTypes()
    }
}

export const updateType = (id, price, name) => {
    return {
        type: "UPDATE_TYPE",
        payload: updateTypes(id, price, name)
    }
}