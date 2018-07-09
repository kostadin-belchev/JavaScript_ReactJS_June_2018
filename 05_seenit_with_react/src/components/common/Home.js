import React, { Component } from 'react'
import LoginForm from './../user/LoginForm'
import RegisterForm from './../user/RegisterForm'
// import $ from 'jquery'
// import observer from '../../infrastructure/observer'

class Home extends Component {
  componentDidMount () {
    // $(document).on({
    //   ajaxStart: () => observer.trigger(observer.events.notification, { type: 'loading', message: 'Loading...' }),
    //   ajaxStop: () => {
    //     let loadingBox = $('#loadingBox')
    //     console.log(loadingBox)
    //     if (loadingBox) {
    //       loadingBox.fadeOut()
    //     }
    //   }
    // })
  }

  render () {
    return (
      <div className='welcome'>
        <div className='signup'>
          <LoginForm {...this.props} />
          <RegisterForm {...this.props} />
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
