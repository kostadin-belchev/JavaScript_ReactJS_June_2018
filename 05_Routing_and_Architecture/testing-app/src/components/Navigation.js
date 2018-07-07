import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class Navigation extends Component {
  render () {
    return (
      <div id='navigation'>
        <NavLink to='/home' activeClassName='activeNav'>Home</NavLink>
        <NavLink to='/all' activeClassName='activeNav'>All cars</NavLink>
        <NavLink to='/addCar' activeClassName='activeNav'>Add car</NavLink>
        <NavLink to='/about' activeClassName='activeNav'>About</NavLink>
        <NavLink to='/aboutContacts' activeClassName='activeNav'>aboutContacts</NavLink>
      </div>
    )
  }
}

export default Navigation
