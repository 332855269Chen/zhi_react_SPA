import React from 'react'
import style from './Footer.module.css'
import {NavLink} from 'react-router-dom'
import { Icon, Tooltip } from 'antd';


export default class Footer extends React.Component{
  render(){
    return (
      <div className={style['foot-btn']}>
        <ul> 
           <li className={style.home}><NavLink to="/home" activeClassName={"home_active"}><Icon type="hdd" /></NavLink></li>
           <Tooltip title="发布文章或回答">
            <li className={style.write}><NavLink to="/ErrorPage" activeClassName={"write_active"}><Icon type="highlight" /></NavLink></li>
          </Tooltip>
          <li className={style.my}><NavLink to="/user" activeClassName={"my_active"}><Icon type="user" /></NavLink></li>
        </ul>
      </div>
    )
  }
}