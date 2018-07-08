import React, { Component } from 'react'
import Navigation from './../common/Navigation'
import observer from '../../infrastructure/observer'
import postsService from '../../infrastructure/postsService'

class SubmitPost extends Component {
  constructor (props) {
    super(props)

    this.state = {
      form: {
        // eslint-disable-next-line
        author: sessionStorage.getItem('username'),
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

    postsService.createPost(this.state.form.author, this.state.form.title, this.state.form.url, this.state.form.imageUrl, this.state.form.description).then(() => {
      // trigger the observer so we can show a notification in case of successful post creation
      observer.trigger(observer.events.notification, { type: 'success', message: 'Post created.' })
      this.props.history.push('/catalog')
    }).catch(err => console.log(err))
  }

  componentDidMount () {
    // console.log(this.props)
    // eslint-disable-next-line
    if (!sessionStorage.getItem('authtoken')) {
      observer.trigger(observer.events.notification, { type: 'error', message: 'You have to be logged in to submit a post' })
      // redirect to home if you are not logged in
      this.props.history.push('/')
    }
  }

  render () {
    return (
      <div>
        <Navigation />
        <section id='viewSubmit'>
          <div className='submitArea'>
            <h1>Submit Link</h1>
            <p>Please, fill out the form. A thumbnail image is not required.</p>
          </div>
          <div className='submitArea formContainer'>
            <form id='submitForm' className='submitForm' onSubmit={this.handleSubmit}>
              <label>Link URL:</label>
              <input name='url' type='text' onChange={this.onInputChanged} value={this.state.form.url} />
              <label>Link Title:</label>
              <input name='title' type='text' onChange={this.onInputChanged} value={this.state.form.title} />
              <label>Link Thumbnail Image (optional):</label>
              <input name='imageUrl' type='text' onChange={this.onInputChanged} value={this.state.form.imageUrl} />
              <label>Comment (optional):</label>
              <textarea name='description' onChange={this.onInputChanged} value={this.state.form.description} />
              <input id='btnSubmitPost' value='Submit' type='submit' />
            </form>
          </div>
        </section>
      </div>
    )
  }
}

export default SubmitPost
