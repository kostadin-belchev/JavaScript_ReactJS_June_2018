import React, { Component } from 'react'
import postsService from '../../infrastructure/postsService'
import Post from './Post'

class PostsList extends Component {
  constructor () {
    super()

    this.state = {
      posts: []
    }

    this.getPosts = this.getPosts.bind(this)
  }

  getPosts () {
    postsService.loadAllPosts().then((posts) => {
      // console.log(posts)
      this.setState({ posts })
    })
  }

  componentDidMount () {
    this.getPosts()
  }

  render () {
    if (this.state.posts.length === 0) {
      return <div className='post-content' style={{fontStyle: 'italic'}}><p>(No posts in database)</p></div>
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

export default PostsList
