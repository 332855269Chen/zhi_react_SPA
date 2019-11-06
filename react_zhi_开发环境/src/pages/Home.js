import React from 'react'
import '../assets/css/Home.css'
// import Swiper from "../components/Swiper/Swiper";
// import {withRouter,Route} from 'react-router-dom'
import Cell from "../components/Cell/Cell";
import {UPDATE_IPTTXT, UPDATE_HOME,UPDATE_COLUMN } from "../store/types";
import connect from "react-redux/es/connect/connect";
import {getDate,} from "../store/actions";

class Home extends React.Component{
  state={
    // banners:[],
    // home:[] 
  };
  componentDidMount(){
    // axios({
    //   url:'/api/home',
    //   params:{
    //     _limit:10,
    //     _page:1
    //   }
    // }).then(
    //   res=>{this.setState({
    //     home:res.data.data
    //   })
    // }
    // );
    this.props.getHome();
    // this.props.getBanner()
  }

  render(){
    let {home,banner} = this.props;
    return (
      <div className="Home" style={{marginTop:"0.8rem"}}>
        {/* <Swiper {...this.props} banners={this.state.banners} dataName={'banner'}/> */}
        <Cell list={home} dataName={'home'}  isShowId={true} />
      </div>
    )
  }

  // componentDidMount(prevProps, prevState,snopshot){
    // this.props.getCollection()
    // console.log('cc',this.props)
  // }

}



const initMapStateToProps = state => ({
  home:state.home,
  // banner:state.banner,
  ipttxt:state.ipttxt,
  column:state.column,
});

const initMapDispatchToProps = dispatch => ({
  getHome:()=>dispatch(getDate({
    url:'/api/home',
    type:UPDATE_HOME,
    _limit:13
  })),
  // getBanner:()=>dispatch(getDate({
  //   url:'/api/banner',
  //   type:UPDATE_BANNER,
  //   _limit:3
  // })),
  // getCollection:()=>dispatch(getDate({
  //   url:'/api/column',
  //   type:UPDATE_COLUMN,
  //   _limit:13
  // })),
  viewNav:(bl)=>dispatch({type:CHAN_IPTTXT,payload:bl}),
});

export default connect(initMapStateToProps,initMapDispatchToProps)(Home)


