import {createStore, applyMiddleware} from 'redux';
import combineReducers from './reducers.js';
// import thunkMiddleware from 'redux-thunk';//应用中间件 处理action函数->action对象（可以返回对象||函数（处理成对象））
import promiseMiddleware from './middleware/promiseMiddleware'//自定义中间件

let store = createStore(combineReducers, applyMiddleware(promiseMiddleware));

// redux 模块热替换
if (module.hot) {
    module.hot.accept("./reducers", () => {
        const nextCombineReducers = require("./reducers").default;
        store.replaceReducer(nextCombineReducers);
    });
}

export default store;