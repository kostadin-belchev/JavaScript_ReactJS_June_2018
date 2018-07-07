import React, { Component } from 'react'
import LoginForm from './../user/LoginForm'
import RegisterForm from './../user/RegisterForm'

class Home extends Component {
  render () {
    return (
      <div className='welcome'>
        <div className='signup'>
          <LoginForm {...this.props} />
          <RegisterForm />
        </div>

        <div className='about'>
          <h1>Welcome to SeenIt</h1>
          <p>
            Share interesting links and discuss great content. It's what's happening now.
          </p>
          <p>Sign in or sign up in a second.</p>
        </div>
      </div>
    )
  }
}

export default Home
