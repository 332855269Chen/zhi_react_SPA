import React from 'react'
import '../assets/css/Login.module.css'
import {Link} from 'react-router-dom'
import { Icon } from 'antd';

import {authUser, getDate} from "../store/actions";
import {CHECK_USER, UPDATE_BANNER, UPDATE_HOME} from "../store/types";
import connect from "react-redux/es/connect/connect";

class Login extends React.Component{
  state={
    username:'',
    password:'',
    mess:''
  };
  render(){

    let {username,password,async,bLoading,request} = this.props;
    return (
      <div className="content" style={{background:"url(/img/regbg.png) repeat",width:"100%",height:"11.4rem",marginTop:"0rem"}}>
      
       <p > <a onClick={()=>this.props.history.go(-1)} style={{fontSize:"0.38rem",marginLeft:"0.3rem"}}> <Icon type="rollback" /></a></p>
        <h1><img src="https://pic4.zhimg.com/80/v2-a47051e92cf74930bedd7469978e6c08_hd.png" style={{width:180,height:115}}/></h1>
        <div className="login-box">
          <p className="lsolid"></p>
          <div className="login">
            <Link to={'/login'} style={{color:"#5477b2"}}>登录</Link>
            {/*<a href="login_m.html">登录</a>*/}
            <span></span>
            <Link to={'/reg'}>注册</Link>
            {/*<a href="reg_m.html">注册</a>*/}
          </div>
          <p className="rsolid"></p>
        </div>
        <ul>
          <li className="lifirst">
            <input type="text"  name="username" value={this.state.username} onChange={this.changeIpt}/>
            <span>帐&nbsp;&nbsp;&nbsp;&nbsp; 号: &nbsp;</span>
          </li>
          <li>
            <input type="text"  name="password"  value={this.state.password} onChange={this.changeIpt}/>
            <span>密&nbsp;&nbsp;&nbsp;&nbsp; 码: &nbsp;</span>
          </li>
          {
            this.state.mess && <li>{this.state.mess}</li>
          }

        </ul>
        <div className="footbox">
          <input type="button" value="登 录" className="login-btn" onClick={this.login}/>
        
          <a className="tishi">忘记密码？</a>
        </div>

      </div>
    )
  }

  changeIpt=(ev)=>{
    this.setState({
      [ev.target.name]:ev.target.value
    })
  };

  login=()=>{
  //   axios({
  //     url:'/mock/login',
  //     params:{
  //       username:this.state.username,
  //       password:this.state.password
  //     }
  //   }).then(
  //     res=>res.data.err===0 ? this.props.history.push('/user') : this.setState({mess:res.data.msg})
  //   )
 
  this.props.login(this.state.username, this.state.password,this.props.history)
  }
   

}




const initMapDispatchToProps = dispatch => ({
  login:(username,password,history)=>dispatch(authUser({
    url:'/api/login',
    save:true,
    type:CHECK_USER,
    method:'post',
    data:{
      username,password
    }
  })).then(
    res=>{
      if (res.err===0){
        //同步
      
        window.localStorage.setItem('news_user',JSON.stringify(res));
        history.push('/user');
      } else {
      alert("用户名或密码有误")
      }
    }
  )
});




export default connect(null,initMapDispatchToProps)(Login)