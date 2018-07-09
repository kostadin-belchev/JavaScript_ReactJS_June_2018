import React, { Component } from 'react'
import Navigation from './../common/Navigation'
import '../../styles/post.css'
import PostList from '../post/PostList'
import observer from '../../infrastructure/observer'
import postsService from '../../infrastructure/postsService'

class Catalog extends Component {
  componentDidMount () {
    // eslint-disable-next-line
    let isLoggedIn = sessionStorage.getItem('authtoken')
    if (isLoggedIn) {
      // eslint-disable-next-line
      let username = sessionStorage.getItem('username')
      // trigger the observer so we can update the header
      observer.trigger(observer.events.loginUser, username)
    }
  }

  render () {
    return (
      <div>
        <Navigation />
        <section id='viewCatalog'>
          <div className='posts'>
            <PostList request={postsService.loadAllPosts} />
          </div>
        </section>
      </div>
    )
  }
}

export default Catalog
