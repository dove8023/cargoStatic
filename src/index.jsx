import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import 'antd/dist/antd.css';
import { Provider } from "react-redux";
import APP from "./pages/APP.jsx";
import store from "./store";

ReactDOM.render(
    <Provider store={store}>
        <APP />
    </Provider>,
    document.getElementById("root")
);