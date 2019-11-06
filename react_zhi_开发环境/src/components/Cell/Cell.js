import React from 'react'
import './assets/css/Cell.css'
import {Link} from 'react-router-dom'
import querystring from 'query-string'
import { Collapse,Icon } from 'antd';


import {CHAN_IPTTXT, CHAN_COLLECTION,UPDATE_COLUMN} from "../../store/types";
import connect from "react-redux/es/connect/connect";
import {collection,getDate} from "../../store/actions";

const { Panel } = Collapse;




 class Cell extends React.Component{

  state={
    bl:true
  }

  constructor(props){
    super(...arguments)
    
    props.getCollection()
    // console.log("constructor",props)
  }


  render(){
    // console.log('cc2333',this.props.column)
    let {list,dataName,isShowId,setCollection,ipttxt,column} = this.props;
        let bb = false
      // console.log(this.props)
      // let arr2 = []
     
    //   this.props.column.forEach((item,index,array)=>{  
    //     arr2.push(array[index].goodsid)
    // })
    // let arr1 = []
    // this.props.home.forEach((item,index,array)=>{  
    //     arr1.push(array[index]._id)
    // })


    

    return (
      <div className="Cell">
     {  isShowId ?  
         
          list.map(item=>(
           
            <div   key={item._id} style={{borderBottom:"0.2rem solid rgba(230, 230, 230, 0.582)",padding:"0.2rem 0.2rem"}}>
               <h2>{item.title}</h2>
            <Link
       to={{pathname:'/detail/'+item._id,search:querystring.stringify({dataName})}}
              key={item._id}
            >                   
             <img src={item.picture} style={{width:"100%",height:"3rem"}}/>
            
             <p className='content'>{item.detail.content}</p>
             </Link>
          
              <div style={{display:"flex",justifyContent:"",marginTop:"0.1rem"}}>
                <div className="zan1"><Icon type="like" theme="filled" /><span>赞同{item.detail.zan}</span> </div>
                <div className="zan2"><Icon type="dislike" theme="filled" />{item.detail.cai}</div>
                <div className="zan3"><Icon type="message" theme="filled" /><span>评论{item.detail.comNum}</span></div>
               
                <div className="zan4" name="收藏" 
                    onClick={(event)=>{
                      this.props.getCollection();this.collect(item._id,event)  //;前后是两个事件
                    }}
                    ref="r1"   
                    > 
         {
     this.props.column.forEach((atem,index,array)=>{
       if(item._id == array[index].goodsid){ return bb = true}  else{return bb = false}  })
       } 

    { bb ? <Icon type="star" theme="filled" style={{color:"yellow"}}/> : <Icon type="star" theme="filled"/>}

                    </div> 
              </div>
            </div>
          ))
              :  
                    <Collapse bordered={false} expandIconPosition="right">
                      {
                    list.map(item=>(
              
                              <Panel header={item.title} key={item.id}>
                                  <Link
                                  to={{pathname:'/detail/'+item._id,search:querystring.stringify({dataName})}}
                                  key={item.id}
                                >
                                <img src={item.picture} style={{width:"100%",height:"3rem"}}/>
                                {item.des}
                                  </Link>
              
                              </Panel>
                          
                      ))
                    }
                    </Collapse> 
      
      }

      </div>
    )
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
        // console.log("已收藏",arr2,_id)
      ev.target.style.color = 'yellow' 
        alert("已收藏")
      }else {
        this.props.removeCollection(_id)
        // console.log("已删除",arr2,_id)
        ev.target.style.color = ''
          alert("已取消收藏")
      } 

    } 
      this.props.getCollection()
      // console.log('column',this.props.column)
  } 
 

  componentDidMount(){
    this.props.getCollection()
     //  console.log('cc1',this)
    //   console.log('cc2',this.props)
      
  }
  
}


Cell.defaultProps={
  isShowId:false
};


const initMapStateToProps = state => ({
  collection:state.collection,
  ipttxt:state.ipttxt,
  column:state.column,
  home:state.home,
});

const initMapDispatchToProps = dispatch => ({
  
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
  viewIpttxt:(bl)=>dispatch({type:CHAN_IPTTXT,payload:bl}),
});

export default connect(initMapStateToProps,initMapDispatchToProps)(Cell)