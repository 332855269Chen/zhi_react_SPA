import React from 'react'
import './assets/css/Swiper.css'
import img2 from './assets/images/img_2.jpg';//模块化引入 适合UI资源

import $ from 'jquery';
import Swipe from './assets/js/swipe';

import {withRouter,Route} from 'react-router-dom'
import querystring from 'query-string'

class Swiper extends React.Component{
  componentDidUpdate(){
    new Swipe($('.banner')[0],{
      auto:2000,
      continuous:true,
      stopPropation:true,
      callback:function (index,element){
        $('.banner ol li').removeClass('active');
        $('.banner ol li').eq(index).addClass('active');
      }
    })
  }
  render(){
    let {banners} = this.props;
    return (
      <div className="banner">
        <ul className="clearfix">

          {
            banners.map(item=>(
              <li key={item.id} onClick={()=>this.goDetail(item.id)}>
                {/*<img onClick={this.goDetail.bind(null,item.id)} src={item.banner} alt=""/>*/}
                <img  src={item.banner} alt=""/>
                <div className="text-box">
                  <h2>{item.title}</h2>
                  <p>{item.sub_title}</p>
                </div>
              </li>
            ))
          }
        </ul>

      </div>
    )
  }

  goDetail=(id)=>{
    // console.log(this.props);
    this.props.history.push({
      pathname:'/detail/'+ id,
      search:querystring.stringify({dataName:this.props.dataName})
    })
  }
}

// export default withRouter(Swiper)
export default Swiper