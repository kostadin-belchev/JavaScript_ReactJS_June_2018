import React, { Component } from 'react'
import postsService from '../../infrastructure/postsService'
import Post from './Post'

class MyPostsList extends Component {
  constructor () {
    super()

    this.state = {
      posts: []
    }

    this.getPosts = this.getPosts.bind(this)
  }

  getPosts () {
    // eslint-disable-next-line
    let currLoggedInUsername = sessionStorage.getItem('username')
    postsService.loadOwnPosts(currLoggedInUsername).then((posts) => {
      // console.log(posts)
      this.setState({ posts })
    })
  }

  componentDidMount () {
    this.getPosts()
  }

  render () {
    if (this.state.posts.length === 0) {
      return <div className='post-content' style={{fontStyle: 'italic'}}><p>(No own posts in database)</p></div>
    }
    return this.state.posts.map((post, index) => {
      post.isEditable = false
      // eslint-disable-next-line
      if (post._acl.creator === sessionStorage.getItem('userId')) {
        post.isEditable = true
      }
      return (<Post key={post._id} rank={index} {...post} />)
    })
  }
}

export default MyPostsList
