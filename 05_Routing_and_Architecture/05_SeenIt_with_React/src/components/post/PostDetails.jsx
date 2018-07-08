import React, { Component } from 'react'
import Navigation from './../common/Navigation'
import observer from '../../infrastructure/observer'
import postsService from '../../infrastructure/postsService'
import CommentForm from '../comment/CommentForm'
import CommentList from '../comment/CommentList'
import commentsService from '../../infrastructure/commentsService'

class PostDetails extends Component {
  constructor () {
    super()

    this.state = {
      post: {},
      comments: []
    }

    this.getPostDetails = this.getPostDetails.bind(this)
    this.deleteCommentFunc = this.deleteCommentFunc.bind(this)
    this.createCommentFunc = this.createCommentFunc.bind(this)
  }

  deleteCommentFunc (id) {
    commentsService.deleteComment(id).then(() => {
      let postId = this.props.match.params.id
      console.log('comment deleted')
      observer.trigger(observer.events.notification, { type: 'success', message: 'Comment deleted.' })
      commentsService.loadAllCommentsInPost(postId).then((comments) => {
        this.setState({ comments })
        // console.log('comment deleted 2')
      }).catch(err => console.log(err))
    }).catch(err => console.log(err))
  }

  createCommentFunc (content, postId) {
    // eslint-disable-next-line
    let author = sessionStorage.getItem('username')
    // console.log('state from createCommentFunc: ')
    // console.log(this.state)
    // console.log('postId from createCommentFunc: ')
    observer.trigger(observer.events.notification, { type: 'success', message: 'Comment created.' })
    // console.log(postId)
    commentsService.createComment(author, content, postId).then((res) => {
      // console.log('res: ')
      // console.log(res)
      commentsService.loadAllCommentsInPost(postId).then((comments) => {
        this.setState({ comments })
      }).catch(err => console.log(err))
    }).catch(err => console.log(err))
  }

  getPostDetails () {
    let postId = this.props.match.params.id
    let postPromise = postsService.loadPostById(postId)
    let commentsPromise = commentsService.loadAllCommentsInPost(postId)
    Promise.all([postPromise, commentsPromise])
      .then(([post, comments]) => {
        // HELPER FUNCTION FOR TIME
        function calcTime () {
          let dateIsoFormat = post._kmd.ect
          let diff = new Date() - (new Date(dateIsoFormat))
          diff = Math.floor(diff / 60000)
          if (diff < 1) return 'less than a minute'
          if (diff < 60) return diff + ' minute' + pluralize(diff)
          diff = Math.floor(diff / 60)
          if (diff < 24) return diff + ' hour' + pluralize(diff)
          diff = Math.floor(diff / 24)
          if (diff < 30) return diff + ' day' + pluralize(diff)
          diff = Math.floor(diff / 30)
          if (diff < 12) return diff + ' month' + pluralize(diff)
          diff = Math.floor(diff / 12)
          return diff + ' year' + pluralize(diff)

          function pluralize (value) {
            if (value !== 1) return 's'
            else return ''
          }
        }
        // putting some post properties
        post.isEditable = false
        // eslint-disable-next-line
        if (post._acl.creator === sessionStorage.getItem('userId')) {
          post.isEditable = true
        }
        post.timeAgoSubmitted = calcTime()
        this.setState({ post, comments })
      })
      .catch(err => console.log(err))
  }

  componentDidMount () {
    this.getPostDetails()
  }

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
    // console.log('state from render: ')
    // console.log(this.state.post)
    let isEditableContent
    let isDeletableContent
    if (this.state.post.isEditable) {
      isEditableContent = <li className='action'><a className='editLink' href={`/editPost/${this.props.match.params.id}`}>edit</a></li>
      isDeletableContent = <li className='action'><a className='deleteLink' href={`/deletePost/${this.props.match.params.id}`}>delete</a></li>
    }
    return (
      <div>
        <Navigation />
        <section id='viewComments'>
          <div className='post'>
            <div className='col thumbnail'>
              <a href={this.state.post.url}>
                <img src={this.state.post.imageUrl} alt='post' />
              </a>
            </div>
            <div className='post-content'>
              <div className='title'>
                <a href={this.state.post.url}>
                  {this.state.post.title}
                </a>
              </div>
              <div className='details'>
                <p>{this.state.post.description === '' ? 'No description' : this.state.post.description}</p>
                <div className='info'>
                  submitted {this.state.post.timeAgoSubmitted} ago by {this.state.post.author}
                </div>
                <div className='controls'>
                  <ul>
                    {isEditableContent}
                    {isDeletableContent}
                  </ul>
                </div>
              </div>
            </div>
            <div className='clear' />
          </div>
          <CommentForm addCommentFn={this.createCommentFunc} postId={this.state.post._id} />
          <CommentList deleteCommentFn={this.deleteCommentFunc} comments={this.state.comments} />
        </section>
      </div>
    )
  }
}

export default PostDetails
