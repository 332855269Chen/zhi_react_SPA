import React from 'react';
import {Route,Redirect} from 'react-router-dom'
import connect from "react-redux/es/connect/connect";
// class Auth extends React.Component{
//   state={
//     hasAuth:false,
//     auth:false,
//     data:{}
//   };
//   componentDidMount(){
//     axios(
//       '/mock/user'
//     ).then(
//       res=>this.setState({
//         hasAuth:true,
//         auth:res.data.err,
//         data:res.data.data
//       })
//     )
//   }

//   render(){
//     let {component:Component} = this.props; // component == User类
//     // 异步条件
//     if (!this.state.hasAuth ){
//       return null;
//     }
//     return <Route  render={(props)=>(
//       this.state.auth===0 ? <Component data={this.state.data} {...props} /> : <Redirect to="/login"/>
//     )} />
//   }

// }


const Auth = ({component:Component,user, ...rest}) => (
  <Route render={(rest)=>(
    user.err === 0 ?
      <Component {...rest} /> :
      <Redirect to="/login" />
  )}/>
);

const initMapStateToProps = state => ({
  user:state.user
});

export default connect(initMapStateToProps,null)(Auth)

