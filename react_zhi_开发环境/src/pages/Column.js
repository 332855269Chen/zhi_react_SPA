import React from 'react'
import '../assets/css/Column.css'
import Cell from "../components/Cell/Cell";
export default class Column extends React.Component{
  state={
    column:[]
  };
  render(){
    return (
      <div className="Column">
        <Cell list={this.state.column} dataName="column" isShowId={false}/>
      </div>
    )
  }

  componentDidMount(){
    axios({
      url:'/mock/column',
      params:{
        _limit:6,
        _page:1
      }
    }).then(
      res=>this.setState({
        column:res.data.data
      })
    )
  }
}