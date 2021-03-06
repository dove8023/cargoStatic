/*
 * @Author: Mr.He 
 * @Date: 2018-08-28 21:26:32 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-09-06 22:32:47
 * @content what is the content of this file. */

import { Ajax } from "../utils/common";

export const getCustomer = async (id) => {
    let result = await Ajax({
        url: "/customer/" + id
    })

    if (result.code != 0) {
        console.info("get customer not found ", id)
        return null;
    }
    return result.data;
}