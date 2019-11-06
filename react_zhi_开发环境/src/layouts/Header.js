import React from 'react'
import style from './Header.module.css'
import {NavLink} from 'react-router-dom'
import fetchJsonp from 'fetch-jsonp';
import { Input,Drawer, Button, Icon } from 'antd';
const { Search } = Input;
import store from '../store/store'
import connect from "react-redux/es/connect/connect";
import { UPDATE_HOME,UPDATE_SEARCH} from "../store/types";
import {getDate} from "../store/actions";


class Header extends React.Component{

  constructor(props){
    super()   
  }

  state = { 
    visible: false, 
    placement:'top',
    ipttxt:"",
    ipttxt2:"",
    bl:false ,
    bl2:false,
    msg5:[],
    msg3:"抱歉，没有亲要的内容喔",
    msg4:[]
   };
  render(){
    // let {home} = this.props
    return (
      <div className={style.nav}>
        <ul onClick={this.changeBl}>  
          <li><NavLink to="/home" activeClassName={style.active}><Icon type="zhihu-circle" theme="filled" /></NavLink></li>
          
          <li>
          <Search
            placeholder="搜索"
            onSearch={
              (value)=> {
                //setState返回是异步的 需要注意
              this.state.ipttxt2 = value

              let {home,search} = this.props
              let arr1 = []
              let ipttxt2 = this.state.ipttxt2
              // console.log(ipttxt2)
              search.forEach((val,index) => {
                  if(val.title.indexOf(ipttxt2) !== -1){
                    arr1.push(val)
                  }       
             });
                  // console.log(value)
                  this.props.Search2(arr1)

              }
 
            }
            style={{ width: 200,lineHeight:"0.6rem",marginTop:8}}
            value={this.state.ipttxt} onChange={this.jsonp}
            // onClick={this.search}
           />
           </li>

        <li>
            <Button type="primary" onClick={this.showDrawer} style={{width: 20,lineHeight:"0.4rem",marginTop:10,marginLeft:160,background:"none",border:0,color:"gray",fontSize:"0.36rem",boxShadow:"none"}}>
            <Icon type="menu" />
            </Button>
            <Drawer
              title={<Icon type="menu" />}
              placement={this.state.placement}
              closable={true}

              onClose={this.onClose}
              visible={this.state.visible}
              
            >
              <NavLink to="/home"><p style={{fontSize:"0.28rem",color:"gray",marginBottom:"0.5rem"}} onClick={this.onClose}><Icon type="profile"/> &nbsp; &nbsp;首页</p></NavLink>
              <NavLink to="/user"><p style={{fontSize:"0.28rem",color:"gray",marginBottom:"0.5rem"}} onClick={this.onClose}><Icon type="user" /> &nbsp; &nbsp; 我的主页</p></NavLink>
              <p onClick={this.logout} style={{fontSize:"0.28rem",color:"gray",marginBottom:"0.5rem"}}><Icon type="poweroff" /> &nbsp; &nbsp;  退出账号</p>
            </Drawer>
        </li>

        </ul>
             {  
               this.state.bl2 &&   
               <ul className={style.shuju_haederUl} style={{}}>
                   { this.state.msg4.map((value,index)=>(
                     <li onClick={this.getMsg4} key={index}  style={{}} className={style.shuju_activeli} >{value}</li>
                    ))}
              </ul> 
            }
         {/* {this.state.bl &&  <p>{this.state.msg3}</p>}      */}
      </div>
    )
  }

  componentDidMount(){
    this.props.getSearch()
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  onChange = e => {
    this.setState({
      placement: e.target.value,
    });
  };

  logout=()=>{
    React.axios({
      url: '/api/logout',
      method: 'delete'
    }).then(
      res=>{
        window.localStorage.removeItem('news_user');
        store.dispatch({type:'CHECK_USER',payload:{err:1}});
        // this.props.history.push('/home')
      }
    )
    this.setState({
      visible: false,
    });
  }

  getMsg4=(ev)=>{
    this.setState({ipttxt:ev.target.innerHTML})
  }

  changeBl=(ev)=>{
    this.setState({
      //  bl2:!this.state.bl2
       bl2:false
    })
  }

  jsonp=(ev)=>{
    
    this.setState({
      ipttxt:ev.target.value
    })
    
    if(ev.target.value.length > 0){
      this.setState({
        bl2:true
      })
    }else if (ev.target.value.length < 1){
      this.setState({
        bl2:false
      })
      this.props.getHome()
    }
    // console.log(this.state.ipttxt.length)

    setTimeout(() => {
      fetchJsonp(
        `https://www.baidu.com/sugrec?prod=pc&wd=${this.state.ipttxt}&cb=show`,
        {
          jsonpCallback:'cb',
          jsonpCallbackFunction:'show',
          timeout:1000
        }
      ).then(
        res=>res.json()
      ).then(
        data=>{
         
          if(!data.g){
            this.setState({bl:true})
            // this.refs.msg222.innerHTML  = "亲，抱歉目前没有你搜索的内容"
          }else{
            let arr1 = []
            data.g.forEach((val,index) => {
                arr1.push(val.q)
             });
          this.setState({bl:false,msg4:arr1}) 
  
            }
                }
            ).catch(
              err=>{console.log(err)}
            )
    }, 300);

  }

}

const initMapStateToProps = state => ({
   home:state.home,
   ipttxt:state.ipttxt,
   search:state.search
  // banner:state.banner,
});

const initMapDispatchToProps = dispatch => ({
  Search2:(arr1)=>{
    //组件内部的异步业务
    // console.log("dispatch",arr1)
    dispatch({type:UPDATE_HOME,payload:arr1})  
  },
  getHome:()=>dispatch(getDate({
    url:'/api/home',
    type:UPDATE_HOME,
    _limit:13
  })),
  getSearch:()=>dispatch(getDate({
    url:'/api/home',
    type:UPDATE_SEARCH,
    _limit:13
  })),

  
});

export default connect(initMapStateToProps,initMapDispatchToProps)(Header)