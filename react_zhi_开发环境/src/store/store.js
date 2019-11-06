import {createStore,applyMiddleware} from 'redux';

import state from './state';
import reducer from './reducer';
import thunk from 'redux-thunk'

//创建store实例
// let store = createStore(reducer,state,中间件1,中间件2);
let store = createStore(reducer,state,applyMiddleware(thunk));

export default store; 