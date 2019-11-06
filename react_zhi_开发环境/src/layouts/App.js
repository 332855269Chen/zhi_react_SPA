import React from 'react'
import './App.css';
import {withRouter,Route,Switch,Redirect} from 'react-router-dom'
import Header from "./Header";
import Footer from "./Footer";

// import Home from "../pages/Home";
import Loadable from 'react-loadable' //async懒加载  减轻首页压力 
const Home = Loadable({
  loader:()=>import('../pages/Home'),
  loading:()=>{return null}
})

// import User from "../pages/User";
import asyncComponent from '../utils/asyncComponent'
const User = asyncComponent(() => import('../pages/User'))

import Follow from "../pages/Follow";
import Column from "../pages/Column";
import Login from "../pages/Login";
import Reg from "../pages/Reg";
import ErrorPage from "../pages/ErrorPage";
import Detail from "../pages/Detail";

import Auth from "../guard/Auth";
import { Skeleton } from 'antd';
// import pubsub from 'pubsub-js';
import {connect} from 'react-redux';
import {VIEW_FOOT, VIEW_LOADING, VIEW_NAV} from "../store/types";



class App extends React.Component{
  // constructor(props){
  //   super()
  //   this.state={
  //     bNav:true,
  //     bFoot:true,
  //     bLoading:false
  //   };
  //     //订阅
  //   pubsub.subscribe('VIEW_LOADING',(msg,data)=>{
  //     this.setState({bLoading:data})
  //   });
  // }

  state={};
  static getDerivedStateFromProps(nextProps, nextState){//路由检测
    let {viewNav,viewFoot} = nextProps;    
    let path = nextProps.location.pathname;
    if (/home|follow|column/.test(path)){
      viewNav(true)
      viewFoot(true)
    }
    if (/user|ErrorPage/.test(path)){
      viewNav(false)
      viewFoot(true)
    }
    // if (/s/.test(path)){
    //   viewNav(true)
    //   viewFoot(false)
    // }
    if (/login|reg|detail/.test(path)){
      viewNav(false)
      viewFoot(false)
    }
    return null
  }

  mounted(){
    import('../pages/Detail.js').then(
      res=>console.log(res)
    )
  }

  render(){
    let {bLoading,bNav,bFoot} = this.props;
    return (
      <div className="app">
      {bNav && <Header/>}
        <Switch>
          <Route path={'/home'} component={Home} /> 
          <Route path={'/follow'} component={Follow} />
          <Route path={'/column'} component={Column} />
          {/* <Route path={'/user'} component={User} /> */}
          <Auth path={'/user'} component={User} />
          <Route path={'/login'} component={Login} />
          <Route path={'/reg'} component={Reg} />
          <Route path={'/detail/:id'} component={Detail} />
          <Redirect exact from="/" to="/home" />
          <Route component={ErrorPage}/>
        </Switch>
        {bLoading && <Skeleton active />}
        {bLoading && <Skeleton active />}
        {bFoot ? <Footer/> : null}
      </div>
    )
  }
}

const initMapStateToProps = state => ({
  bLoading:state.bLoading,
  bNav:state.bNav,
  bFoot:state.bFoot
});

const initMapDispatchToProps = dispatch => ({
  viewNav:(bl)=>dispatch({type:VIEW_NAV,payload:bl}),
  viewFoot:(bl)=>dispatch({type:VIEW_FOOT,payload:bl}),
  viewLoading:(bl)=>dispatch({type:VIEW_LOADING,payload:bl}),
});

export default connect(initMapStateToProps,initMapDispatchToProps)(withRouter(App))