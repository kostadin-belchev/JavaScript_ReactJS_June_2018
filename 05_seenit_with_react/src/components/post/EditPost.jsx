import React, { Component } from 'react'
import Navigation from './../common/Navigation'
import observer from '../../infrastructure/observer'
import postsService from '../../infrastructure/postsService'

class EditPost extends Component {
  constructor (props) {
    super(props)

    this.state = {
      form: {
        author: '',
        title: '',
        url: '',
        imageUrl: '',
        description: ''
      }
    }

    this.onInputChanged = this.onInputChanged.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  onInputChanged (event) {
    event.preventDefault()
    const name = event.target.name
    const value = event.target.value
    const newState = {}
    newState[name] = value
    this.setState({
      form: Object.assign(this.state.form, newState)
    })
  }

  handleSubmit (event) {
    event.preventDefault()
    // validations
    if (this.state.form.title === '' || this.state.form.url === '') {
      observer.trigger(observer.events.notification, { type: 'success', message: 'URL/Title cannot be empty!' })
      return
    }
    if (!this.state.form.url.startsWith('http')) {
      observer.trigger(observer.events.notification, { type: 'success', message: 'URL should start with "http"!' })
      return
    }

    let postId = this.props.match.params.id
    postsService.editPost(postId, this.state.form.author, this.state.form.title, this.state.form.url, this.state.form.imageUrl, this.state.form.description)
      .then(() => {
        // trigger the observer so we can show a notification in case of successful post edit
        observer.trigger(observer.events.notification, { type: 'success', message: `Post ${this.state.form.title} updated.` })
        this.props.history.push('/catalog')
      }).catch(err => console.log(err))
  }

  componentDidMount () {
    let postId = this.props.match.params.id
    postsService.loadPostById(postId).then((post) => {
      // eslint-disable-next-line
      if (post._acl.creator !== sessionStorage.getItem('userId')) {
        // trigger the observer so we can show a notification in case of user trying to edit post that was not created by him
        observer.trigger(observer.events.notification, { type: 'success', message: 'You can only edit your own posts' })
        this.props.history.push('/catalog')
      }

      this.setState({
        form: post
      })
    }).catch(err => console.log(err))
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
    return (
      <div>
        <Navigation />
        <section id='viewEdit'>
          <div className='submitArea'>
            <h1>Edit Link</h1>
            <p>Please, fill out the form. A thumbnail image/description is not required.</p>
          </div>
          <div className='submitArea formContainer'>
            <form id='editPostForm' className='submitForm' onSubmit={this.handleSubmit}>
              <label>Link URL:</label>
              <input name='url' type='text' onChange={this.onInputChanged} value={this.state.form.url} />
              <label>Link Title:</label>
              <input name='title' type='text' onChange={this.onInputChanged} value={this.state.form.title} />
              <label>Link Thumbnail Image (optional):</label>
              <input name='imageUrl' type='text' onChange={this.onInputChanged} value={this.state.form.imageUrl} />
              <label>Comment (optional):</label>
              <textarea name='description' onChange={this.onInputChanged} value={this.state.form.description} />
              <input id='btnEditPost' type='submit' value='Edit Post' />
            </form>
          </div>
        </section>
      </div>
    )
  }
}

export default EditPost
