import React, { Component } from 'react'
import Navigation from './../common/Navigation'
import '../../styles/post.css'
import PostList from '../post/PostList'
import observer from '../../infrastructure/observer'

class Catalog extends Component {
  componentWillMount () {
    // eslint-disable-next-line
    let isLoggedIn = sessionStorage.getItem('authtoken')
    if (isLoggedIn) {
      // eslint-disable-next-line
      let username = sessionStorage.getItem('username')
      observer.trigger(observer.events.loginUser, username)
    }
  }
  // Get the posts first and then pass them as props to the PostList component below
  // TO DO
  render () {
    return (
      <div>
        <Navigation />
        <section id='viewCatalog'>
          <div className='posts'>
            <PostList />
          </div>
        </section>
      </div>
    )
  }
}

export default Catalog
