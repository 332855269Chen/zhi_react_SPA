import React from 'react'
import '../assets/css/Reg.css'
import {Link} from "react-router-dom";
import { Icon } from 'antd';


import {authUser} from "../store/actions";
import {CHECK_USER} from "../store/types";
import connect from "react-redux/es/connect/connect";

class Reg extends React.Component{

  state={
    username:'',
    password:'',
    mess:''
  };
 
  render(){
    return (
      <div className="content" style={{background:"url(/img/regbg.png) repeat",width:"100%",height:"11.4rem",marginTop:"0rem"}}>
        <p > <a onClick={()=>this.props.history.go(-1)} style={{fontSize:"0.38rem",marginLeft:"0.3rem"}}> <Icon type="rollback" /></a></p>
        <h1><img src="https://pic4.zhimg.com/80/v2-a47051e92cf74930bedd7469978e6c08_hd.png" style={{width:180,height:115}}/></h1>
        
        <div className="login-box">
          <p className="lsolid"></p>
          <div className="login">
            <Link to={'/login'} style={{background:""}}>登录</Link>
            {/*<a href="login_m.html">登录</a>*/}
            <span></span>
            <Link to={'/reg'} style={{color:"#5477b2"}}>注册</Link>
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
          <input type="button" value="注 册" className="login-btn" onClick={this.reg}/>
          <a  className="tishi">忘记密码？</a>  
        </div>
      </div>

    )
  }

  changeIpt=(ev)=>{
    this.setState({
      [ev.target.name]:ev.target.value
    })
  };

  reg=()=>{
    // axios({
    //   url:'/mock/reg',
    //   method:'post',
    //   data:{
    //     username:this.state.username,
    //     password:this.state.password
    //   }
    // }).then(
    //   res=>res.data.err===0 ? this.props.history.push('/login') : this.setState({mess:res.data.msg})
    // )
    this.props.reg(this.state.username, this.state.password,this.props.history)
  }
}



const initMapDispatchToProps = dispatch => ({
  reg:(username,password,history)=>dispatch(authUser({
    url:'/api/reg',
    save:true,
    type:CHECK_USER,
    method:'post',
    data:{
      username,password
    }
  })).then(
    res=>{
      // console.log(res)
      if (res.err===0){
        //同步
        // window.localStorage.setItem('news_user',JSON.stringify(res));
        history.push('/login');
      } else {
          console.log(res.err)
      }
    }
  )
});




export default connect(null,initMapDispatchToProps)(Reg)