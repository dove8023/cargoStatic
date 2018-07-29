import { combineReducers } from "redux";
import types from "./types";
import takeGoodOrder from "./takeGoodOrder";

export default combineReducers({
    types,
    takeGoodOrder
})