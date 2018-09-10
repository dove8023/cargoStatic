import { combineReducers } from "redux";
import types from "./types";
import takeGoodOrder from "./takeGoodOrder";
import orders from "./order";
import customers from "./customer";

export default combineReducers({
    types,
    takeGoodOrder,
    orders,
    // customers
})