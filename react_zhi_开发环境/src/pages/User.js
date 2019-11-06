import React from 'react';
import '../assets/css/User.css';
import Cell from "../components/Cell/Cell";

import {getDate} from "../store/actions";
import connect from "react-redux/es/connect/connect";
import store from '../store/store';
import {UPDATE_HOME} from "../store/types";

import {Tabs, WhiteSpace, Badge } from 'antd-mobile';
const tabs = [
  { title: <Badge dot="" text={''}>我的收藏</Badge> },
  { title: <Badge dot="" text={''}>回答</Badge> },
  { title: <Badge dot="true">文章</Badge> },
];

 class User extends React.Component{
  // state={
  //   home:[] 
  // };

  componentDidMount(){
    // axios({
    //   url:'/mock/essay',
    //   params:{
    //     _limit:6,
    //     _page:1
    //   }
    // }).then(
    //   res=>this.setState({
    //     home:res.data.data
    //   })
    // ); 
    this.props.getHome();
  }

    


  render(){
    let {user,home,column}= this.props; 
    let arr1 = []
    return (
      <div className="user">
        <div className="user--header">

          <h2><img
           src="/img/timg.jpg" alt="" 
            // src={'http://localhost:3000' + user.data.icon}
           style={{width:70,height:70,borderRadius:"50%"}}/></h2>

          <div className="user-box">
            <a >{user.data.username}</a>
            <a onClick={this.logout}>注销</a>
          </div>

          <ul className="clear">
            <li>
              <span>0</span>
              <p>关注我的人</p>
            </li>
            <li>
              <span>0</span>
              <p className="end">我关注的人</p>
            </li>
          </ul>
        </div>


        <div className="docList">
          {  
             home.map(item => (
              column.forEach((atem,index,array)=>{
                if(item._id == array[index].goodsid){arr1.push(item)}
             })
           ))
           
       }
          {/* <Cell list={arr1} dataName={'home'} /> */}
        </div>
       
  <div>
    <Tabs tabs={tabs}
      initialPage={0}
      onChange={(tab, index) => { 
        console.log('onChange', index, tab.title.props.dot);
        // tab.title.props.dot = "false"
       }}
      onTabClick={(tab, index) => { 
        // console.log('onTabClick', index, tab);
       }}
    >
      <div style={{ display: 'flex', alignItems: 'top', justifyContent: 'center',height:"450px", backgroundColor: '#fff' }}>
      <Cell list={arr1} dataName={'home'} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
        敬请期待...
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
        敬请期待...
      </div>
    </Tabs>
    <WhiteSpace />
  </div>


      </div>
    )
  }

  logout=()=>{
    React.axios({
      url: '/api/logout',
      method: 'delete'
    }).then(
      res=>{
        window.localStorage.removeItem('news_user');
        store.dispatch({type:'CHECK_USER',payload:{err:1}});
        this.props.history.push('/home')
      }
    )
  }


}


const initMapStateToProps = state => ({
  user:state.user,
  home:state.home,
  column:state.column

});

const initMapDispatchToProps = dispatch => ({
  getHome:()=>dispatch(getDate({
    url:'/api/home',
    type:UPDATE_HOME,
    _limit:100
  })),
  getCollection:()=>dispatch(getDate({
    url:'/api/column',
    type:UPDATE_COLUMN,
    _limit:100
  })),
});

export default connect(initMapStateToProps,initMapDispatchToProps)(User)