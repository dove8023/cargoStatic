/*
 * @Author: Mr.He 
 * @Date: 2018-05-28 11:34:39 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-05-28 14:43:30
 */


export function isMobile() {
    let userAgent = navigator.userAgent.toLowerCase();
    return userAgent.indexOf("mobile") > -1;
}