import React from 'react'
import '../assets/css/ErrorPage.css'
export default class ErrorPage extends React.Component{
    constructor(props){
      super()
    }
  render(){
    return (
      <div className="ErrorPage">
        <h3>ErrorPage</h3>
        
        {/* <a href="javascript:window.history.go(-1);">←</a> */}
        <a onClick={this.goback}>←</a>
      </div>
    )
  }

  goback=()=>{
    this.props.history.go(-1)
  }
}