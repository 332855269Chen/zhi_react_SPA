import React from 'react'
import '../assets/css/Follow.css'
import Cell from "../components/Cell/Cell";
export default class Follow extends React.Component{
  state={
    follow:[]
  };

  render(){
    return (
      <div className="Follow">
        <Cell list={this.state.follow} dataName="follow"/>
      </div>
    )
  }
  componentDidMount(){
    axios({
      url:'/mock/follow',
      params:{
        _limit:8,
        _page:1
      }
    }).then(
      res=>this.setState({
        follow:res.data.data
      })
    )
  }
}