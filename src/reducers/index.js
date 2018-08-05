import { combineReducers } from "redux";
import types from "./types";
import takeGoodOrder from "./takeGoodOrder";
import orders from "./order";

export default combineReducers({
    types,
    takeGoodOrder,
    orders
})