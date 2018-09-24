/*
 * @Author: he@whaleblue.design 
 * @Date: 2018-08-02 23:01:31 
 * @Last Modified by: he@whaleblue.design
 * @Last Modified time: 2018-08-02 23:13:06
 * @content what is the content of this file. */

import { Ajax } from "../utils/common";

export let getStaff = async (id) => {
    let result = await Ajax({
        url: "/staff/" + id
    })
}