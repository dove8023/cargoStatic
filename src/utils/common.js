/*
 * @Author: Mr.He 
 * @Date: 2018-05-28 11:34:39 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-07-03 23:16:46
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


// Ajax({
//     url: "/test",
// });


// Ajax({
//     url: "/open/test",
// });

// Ajax({
//     url: "/open/11test",
// });

