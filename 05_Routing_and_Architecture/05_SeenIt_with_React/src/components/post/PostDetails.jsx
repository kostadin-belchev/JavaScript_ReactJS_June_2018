import React, { Component } from 'react'
import Navigation from './../common/Navigation'
import observer from '../../infrastructure/observer'
import postsService from '../../infrastructure/postsService'
import CommentForm from '../comment/CommentForm'
import CommentList from '../comment/CommentList'
import commentsService from '../../infrastructure/commentsService'
import calcTime from '../../infrastructure/calcTime'

class PostDetails extends Component {
  constructor () {
    super()

    this.state = {
      post: { author: '', title: '', url: '', imageUrl: '', description: '', _id: '' },
      comments: []
    }

    this.getPostDetailsFromServer = this.getPostDetailsFromServer.bind(this)
    this.deleteCommentFunc = this.deleteCommentFunc.bind(this)
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this)
  }

  deleteCommentFunc (id) {
    // Our application is now feature complete but it feels slow to have to wait for the request to complete before the comment we want to delete disappears from the list.
    // We can optimistically add this comment to the list to make the app feel faster.
    let comments = this.state.comments
    let index
    for (const comment of comments) {
      if (comment._id === id) {
        index = comments.indexOf(comment)
      }
    }
    if (index > -1) {
      comments.splice(index, 1)
    }
    let newComments = comments
    this.setState({ comments: newComments })
    // just for faste UI notifications
    observer.trigger(observer.events.notification, { type: 'success', message: 'Comment deleted.' })

    commentsService.deleteComment(id).then(() => {
      observer.trigger(observer.events.notification, { type: 'success', message: 'Comment deleted.' })
      let postId = this.props.match.params.id
      commentsService.loadAllCommentsInPost(postId).then((comments) => {
        this.setState({ comments })
      }).catch(err => console.log(err))
    }).catch(err => console.log(err))
  }

  handleCommentSubmit (content) {
    // eslint-disable-next-line
    let author = sessionStorage.getItem('username')
    // console.log('author from PostDetails from handleCommentSubmit: ')
    // console.log(author)
    let postId = this.state.post._id
    // console.log('postId from PostDetails from handleCommentSubmit: ')
    // console.log(postId)
    // console.log('content from handleCommentSubmit: ')
    // console.log(content)

    // Our application is now feature complete but it feels slow to have to wait for the request to complete before your comment appears in the list.
    // We can optimistically add this comment to the list to make the app feel faster.
    let comments = this.state.comments
    // Optimistically set an id on the new comment. It will be replaced by an
    // id generated by the server. In a production application you would likely
    // not use Date.now() for this and would have a more robust system in place.
    // eslint-disable-next-line
    let userId = sessionStorage.getItem('userId')
    let comment = {
      author,
      content,
      postId,
      _id: Date.now(),
      _acl: { creator: userId },
      _kmd: { ect: Date.now() }
    }
    let newComments = comments.concat([comment])
    this.setState({ comments: newComments })
    observer.trigger(observer.events.notification, { type: 'success', message: 'Comment created.' })
    commentsService.createComment(author, content, postId).then((res) => {
      // console.log('res: ')
      // console.log(res)
      commentsService.loadAllCommentsInPost(postId).then((comments) => {
        this.setState({ comments })
      }).catch(err => console.log(err))
    }).catch(err => console.log(err))
  }

  getPostDetailsFromServer () {
    let postId = this.props.match.params.id
    let postPromise = postsService.loadPostById(postId)
    let commentsPromise = commentsService.loadAllCommentsInPost(postId)
    Promise.all([postPromise, commentsPromise])
      .then(([post, comments]) => {
        // putting some post properties
        post.isEditable = false
        // eslint-disable-next-line
        if (post._acl.creator === sessionStorage.getItem('userId')) {
          post.isEditable = true
        }
        post.timeAgoSubmitted = calcTime(post)
        this.setState({ post, comments })
      })
      .catch(err => console.log(err))
  }

  componentDidMount () {
    this.getPostDetailsFromServer()
    // authomatic update every X milliseconds
    // setInterval(this.getPostDetailsFromServer, 3000)
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
          <CommentForm onCommentSubmit={this.handleCommentSubmit} postId={this.state.post._id} />
          <CommentList deleteCommentFn={this.deleteCommentFunc} comments={this.state.comments} />
        </section>
      </div>
    )
  }
}

export default PostDetails
