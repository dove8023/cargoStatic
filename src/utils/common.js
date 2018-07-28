/*
 * @Author: Mr.He 
 * @Date: 2018-05-28 11:34:39 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-07-12 23:13:50
 */

import axios from "axios";
import { BACK_SYSTEM_URL } from "../../config";

export function isMobile() {
    let userAgent = navigator.userAgent.toLowerCase();
    return userAgent.indexOf("mobile") > -1;
}

export async function Ajax(params) {
    let { headers = {} } = params;
    headers.token = sessionStorage.getItem("token");

    params.before && params.before();
    try {
        let result = await axios({
            url: BACK_SYSTEM_URL + params.url,
            method: params.method || "get",
            headers,
            params: params.params,
            data: params.data
        });

        let { code } = result.data;
        if (code == 100100 || code == 100101) {
            sessionStorage.clear();
            return location.hash = "/";
        }

        return result.data;
    } catch (e) {
        throw new Error(e);
    } finally {
        params.complete && params.complete();
    }
}


export function numFliter(num, digit = 2) {
    const VAL = Math.pow(10, digit);
    return Math.floor(VAL * num) / VAL;
}


// Ajax({
//     url: "/test",
// });


// Ajax({
//     url: "/open/test",
// });

// Ajax({
//     url: "/open/11test",
// });

