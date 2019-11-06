import React from 'react';
import ReactDom,{render} from 'react-dom';
import './assets/css/base.css'
import './library/font'
// import {BrowserRouter} from 'react-router-dom'
import { HashRouter } from 'react-router-dom'
import App from "./layouts/App";
import './utils/axios';

//引入 ant UI 
import 'antd/dist/antd.css';
import 'antd-mobile/dist/antd-mobile.css';

import store from "./store/store";
import {Provider} from 'react-redux'

let local = window.localStorage.getItem('news_user');
if (local){
  store.dispatch({type:'CHECK_USER',payload:JSON.parse(local)})
}

render( 
  <Provider store={store}>
     <HashRouter>
       <App />
     </HashRouter>
  </Provider>
  ,
  document.getElementById('root')
);