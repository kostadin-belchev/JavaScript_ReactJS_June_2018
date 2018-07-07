import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import '../../styles/menu.css'

class Navigation extends Component {
  render () {
    return (
      <div id='menu'>
        <div className='title'>Navigation</div>
        <NavLink to='/catalog' className='nav' activeClassName='active'>Catalog</NavLink>
        <NavLink to='/submit' className='nav' activeClassName='active'>Submit Link</NavLink>
        <NavLink to='/myPosts' className='nav' activeClassName='active'>My Posts</NavLink>
      </div>
    )
  }
}

export default Navigation
