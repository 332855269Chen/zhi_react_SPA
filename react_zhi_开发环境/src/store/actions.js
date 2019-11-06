import React from 'react';


export const getDate = ({url,id=null,type,_page=1,_limit=10}) => {

  return (dispatch,getState)=>{
    return React.axios({
      url: id ? url + '/' + id : url,
      params:{
        _page, _limit
      }
    }).then(
      res => {
        dispatch({type: type, payload: res.data.data});
        // console.log(res.data)
      }
    )
  }
};

export const authUser = ({
  url,save=false,receipt=true,type,method='get',params={},data={}
}) => {
  return (dispatch,getState)=>{
    return React.axios({
  url: url,method, data: {...data,save}, params:{...params, save},
    }).then(
      res => {
        dispatch({type: type, payload: res.data});
       
        if (receipt){
          return res.data
        }
      }
    )
  }
};

export const collection = ({url,_id=null,num=1,type}) => {

  return (dispatch)=>{
    return React.axios({
      url,
      params:{
        _id,num
      }
    }).then(
      res => {
        dispatch({type:type, payload:res.data});
        return  res.data;
        // console.log(res.data)
      }
    )
  }
};

