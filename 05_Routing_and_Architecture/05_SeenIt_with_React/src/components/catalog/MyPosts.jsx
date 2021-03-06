import React, { Component } from 'react'
import Navigation from './../common/Navigation'
import '../../styles/post.css'
import MyPostsList from '../post/MyPostsList'
import observer from '../../infrastructure/observer'
import postsService from '../../infrastructure/postsService'

class MyPosts extends Component {
  componentWillMount () {
    // eslint-disable-next-line
    let isLoggedIn = sessionStorage.getItem('authtoken')
    if (isLoggedIn) {
      // eslint-disable-next-line
      let username = sessionStorage.getItem('username')
      observer.trigger(observer.events.loginUser, username)
    }
  }

  render () {
    return (
      <div>
        <Navigation />
        <section id='viewMyPosts'>
          <div className='post post-content'>
            <h1>Your Posts</h1>
          </div>
          <div className='posts'>
            <MyPostsList request={postsService.loadOwnPosts} reqArguments={{arg1: window.sessionStorage.getItem('username')}} />
          </div>
        </section>
      </div>
    )
  }
}

export default MyPosts
