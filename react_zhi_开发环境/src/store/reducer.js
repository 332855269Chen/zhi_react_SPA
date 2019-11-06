//reducer 改，获取state 必须要有返回值
import * as types from './types'
export default (state,{type,payload})=>{

  // console.log('reducer1',state);


  switch (type) {
    case types.VIEW_NAV:
      return {...state,bNav:payload};
    case types.VIEW_FOOT:
      return {...state,bFoot:payload};
      //处理同步，数据整理，解析
    case types.UPDATE_COLUMN:
      return {...state,column:payload};
      
    case types.UPDATE_HOME:
      return {...state,home:payload};
    case types.UPDATE_SEARCH:
      return {...state,search:payload};
    case types.UPDATE_BANNER:
      return {...state,banner:payload};
    case types.VIEW_LOADING:
      return {...state,bLoading:payload};
    case types.CHECK_USER:
      return {...state,user:payload};
    case types.UPDATE_DETAIL:
      return {...state,detail:payload};
    case types.CHAN_IPTTXT:
      return {...state,ipttxt:payload};
    case types.CHAN_COLLECTION:
      return {...state,collection:payload};
    


    default:
      return state

  }
}