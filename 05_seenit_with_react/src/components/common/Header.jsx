import React, { Component } from 'react'
import '../../styles/header.css'
import observer from '../../infrastructure/observer'

class Header extends Component {
  constructor () {
    super()

    this.state = {
      username: null
    }

    observer.subscribe(observer.events.loginUser, this.userLoggedInUpdateFn.bind(this))
    // this.handleHomeClick = this.handleHomeClick.bind(this)
  }

  userLoggedInUpdateFn (username) {
    this.setState({ username })
  }

  render () {
    const loggedInElement =
      <div id='profile'>
        <span id='username'>Hello, {this.state.username}!</span>|<a href='/logout' id='linkMenuLogout'>logout</a>
      </div>
    return (
      <header>
        <span className='logo'>&#9731;</span><span className='header'><a href='/'>SeenIt</a></span>
        {this.state.username ? loggedInElement : null}
      </header>
    )
  }
}

export default Header
