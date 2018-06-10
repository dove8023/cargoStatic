/*
 * @Author: Mr.He 
 * @Date: 2018-05-28 11:34:39 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-06-10 18:20:28
 */

import axios from "axios";
import { BACK_SYSTEM_URL } from "../../config";

export function isMobile() {
    let userAgent = navigator.userAgent.toLowerCase();
    return userAgent.indexOf("mobile") > -1;
}

export async function Ajax(params) {
    let result = await axios({
        url: BACK_SYSTEM_URL + params.url,
        method: params.method || "get",
        headers: params.headers,
        params: params.params,
        data: params.data
    });


    // console.log(123, result);
    return result.data;
}