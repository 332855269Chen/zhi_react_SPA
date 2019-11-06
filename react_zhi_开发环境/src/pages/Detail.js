import React from 'react'
import '../assets/css/Detail.css'
// import zan from '../assets/img/zan.png';
import {Icon} from 'antd';
import querystring from 'query-string'
import FormatDate from "../utils/FormatDate";

import {CHAN_IPTTXT, CHAN_COLLECTION,UPDATE_COLUMN,UPDATE_DETAIL} from "../store/types";
import connect from "react-redux/es/connect/connect";
import {collection,getDate} from "../store/actions";

class Detail extends React.Component{
    constructor(props){
      super();
      this.state={
        detail:{}
      };
      // React.axios({
      //   url:`/api/${querystring.parse(props.location.search).dataName}/${props.match.params.id}`
      // }).then(
      //   res=>{
      //     this.setState({detail:res.data.data})
      //       console.log('decon',res)
      //   }
      // )

      let id = props.match.params.id;
      let dataName = querystring.parse(props.location.search).dataName;
      props.getDetail(id, dataName)
    }

    render(){
      // let {detail} = this.state;
        let {detail} = this.props;
        let bb = false;
        // let shuju = 'adsfasdfas <span style="background:red">dfasdf</span>  asfdasdfsdf';
      return (
        <div className="Detail" style={{position:"relative"}}>
         <p onClick={this.goback} style={{fontSize:"0.5rem"}}> <Icon type="import" /></p>
          {
            detail.title && (
              <div className="content">
                <h3>{detail.title}</h3>
                <div className="header clear"><h2><img src={detail.detail.icon} alt="" style={{width:"0.6rem"}}/></h2><p>{detail.detail.auth}</p></div>
                <div className="cont">
                  <div><img src={detail.picture} style={{width:"100%"}}/></div>
                <div className="time"><p style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:'3rem'}}>
                  {FormatDate(detail.time)}
                  <span>  
                  {/* <img src={zan} alt=""/> */}
                  <Icon type="clock-circle" theme="filled" /> 
                  </span>
                  </p>
                  </div>
                  <div
                    className="text-box"
                    dangerouslySetInnerHTML={{__html:detail.detail.content }}
                  >
                  </div>
                    <div style={{display:"flex",justifyContent:"",marginTop:"0.5rem",position:"absolute",bottom:"0.1rem"}}>
                      <div className="zan1"><Icon type="like" theme="filled" /><span>赞同{detail.detail.zan}</span> </div>
                      <div className="zan2"><Icon type="dislike" theme="filled" />{detail.detail.cai}</div>
                      <div className="zan3"><Icon type="message" theme="filled" /><span>评论{detail.detail.comNum}</span></div>
                     
                <div className="zan4" name="收藏" 
                    onClick={(event)=>{
                      this.props.getCollection();this.collect(detail._id,event)  //;前后是两个事件
                    }}
                    ref="r1"   
                    > 
         {
     this.props.column.forEach((atem,index,array)=>{
       if(detail._id == array[index].goodsid){ return bb = true}  else{return bb = false}  })
       } 

    { bb ? <Icon type="star" theme="filled" style={{color:"yellow"}}/> : <Icon type="star" theme="filled"/>}

                    </div> 
                    </div>
                </div>
              </div>
            )
          }
      </div>
      )   
    }

    goback=()=>{
      this.props.history.go(-1)
    }

    collect=(_id,ev)=>{

      this.props.getCollection()
      if(this.props.column.length == 0){
        this.props.setCollection(_id)
        //  console.log("first已收藏")
          ev.target.style.color = 'yellow'
      }
      else{
  
        var arr2 = []
        this.props.column.forEach((item,index,array)=>{  
          arr2.push(array[index].goodsid)
      })
        
        if(arr2.indexOf(_id) == -1){   //-1表示没有 可以收藏 
          this.props.setCollection(_id)
        // ev.target.style.color = 'yellow' 
          alert("已收藏")
        }else {
          this.props.removeCollection(_id)
          // ev.target.style.color = ''
            alert("已取消收藏")
        } 
  
      } 
        this.props.getCollection()
    } 
    componentDidMount(){
      this.props.getCollection()
    }


}



  const initMapStateToProps = state =>({
    detail:state.detail,
    collection:state.collection,
    ipttxt:state.ipttxt,
    column:state.column,
    home:state.home,
  })
   

 
   const initMapDispatchToProps = dispatch => ({
    getDetail:(id,dataName)=>dispatch(getDate({
      url:`/api/${dataName}`, 
      type:"UPDATE_DETAIL",
      id:id
    })),
    setCollection:(_id)=>dispatch(
      collection({
      url:'/api/add',
      type:CHAN_COLLECTION,
      _id:_id,
      num:1
    })).then(res=>{
      // console.log("11",res.insertedIds["0"])
    }),
  
    removeCollection:(_id)=>dispatch(
      collection({
      url:'/api/ashan',
      type:CHAN_COLLECTION,
      _id:_id,
    })),
  
   getCollection:()=>dispatch(getDate({
      url:'/api/column',
      type:UPDATE_COLUMN,
      _limit:100
    })),
  });

  export default connect(initMapStateToProps,initMapDispatchToProps)(Detail)