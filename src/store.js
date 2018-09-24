/*
 * @Author: Mr.He 
 * @Date: 2018-07-01 22:37:58 
 * @Last Modified by: he@whaleblue.design
 * @Last Modified time: 2018-07-29 11:15:23
 * @content what is the content of this file. */

import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from "./reducers";

const store = createStore(rootReducer, {}, applyMiddleware(
    thunkMiddleware,
    promiseMiddleware(),
    logger
));
export default store;