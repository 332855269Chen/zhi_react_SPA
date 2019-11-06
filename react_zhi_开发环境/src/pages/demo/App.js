import React from 'react';

import {connect} from 'react-redux';  // connect 高级组件 HOC

import axios from 'axios';
import {action4,action5} from "../storetest/actions";

//UI组件
class App extends React.Component{
  render(){
    let {list,add,async,bLoading,request} = this.props;
    return (
      <div className="app">
        <h3>redux</h3>
        <input type="button" value="添加" onClick={()=>add('k5')}/>
        <input type="button" value="异步添加" onClick={()=>async()}/>
        {/*<input type="button" value="所有类型请求" onClick={()=>request({
          url:'/api/home',
          type:'ADD_ITEM'
        })}/>*/}
        {/*<input type="button" value="所有类型请求" onClick={()=>request({
          url:'/api/home',
          type:'ADD_ITEM',
          id:"5cf8b67e80d7e3205880925c",
          receipt:false
        })}/>*/}
        <input type="button" value="所有类型请求" onClick={()=>request({
          url:'/api/login',
          type:'ADD_ITEM',
          username:'alex',
          method:'post',
          password:'alex123',
          save:false
        })}/>
        {bLoading && <div>添加中...</div>}
        {/*<ul>
          {
            list.map((item,index)=>(
              <li key={index}>{item.title}</li>
            ))
          }
        </ul>*/}
      </div>
    )
  }
}

//处理Provider提供的state转换到UI组件内部
/*const mapStateToProps=(state,ownProps)=>{
  // console.log(state,ownProps);//state公共仓库  ownProps 调用<组件 title="ownProps">
  return {
    list:state.list
  }
};*/

const mapStateToProps = state => ({
  list:state.list,
  bLoading:state.bLoading
});

//处理ui组件发送的请求和业务逻辑
const mapDispatchToProps=( dispatch, ownProps ) => {
  // console.log(dispatch);//dispatch== this.props.store.dispatch
  return {
    add:(val)=>{
      //组件内部的异步业务
      dispatch({type:'ADD_ITEM',payload:val})
    },

    /*async:()=>{

      //组件内部的异步业务
      axios({
        url:'/data/user.json'
      }).then(
        res=>dispatch({type:'ADD_ITEM',payload:res.data.username})
      );

    }*/

    // async: ()=>action1(dispatch)

    // async: () => dispatch(action2(dispatch))

    /*async: () => dispatch(action3(dispatch)).then(
      res=>console.log('组件内部接回执',res)
    )*/

    async: () => dispatch(action4()).then(
      res=>console.log('组件内部接回执',res)
    ),


    request: (opts) => {
      dispatch(action5(opts)).then(
      res=>console.log('组件内部接回执5',res)
    )
  }

  }
}; 

//容器组件
const Container = connect(mapStateToProps,mapDispatchToProps)(App);

export default Container;

