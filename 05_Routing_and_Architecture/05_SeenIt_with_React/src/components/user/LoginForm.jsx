import React, { Component } from 'react'
import auth from '../../infrastructure/auth'
import observer from '../../infrastructure/observer'
import saveSession from './../../infrastructure/saveSession'

class LoginForm extends Component {
  constructor () {
    super()

    this.state = {
      username: '',
      password: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    const fieldName = event.target.name
    const fieldValue = event.target.value
    this.setState({ [fieldName]: fieldValue })
  }

  handleSubmit (event) {
    event.preventDefault()
    // login user
    auth.login(this.state.username, this.state.password).then((response) => {
      // console.log(response)
      // trigger the observer so we can show a notification in case of successful login
      observer.trigger(observer.events.notification, { type: 'success', message: 'Login successful.' })
      saveSession(response)
      // if login succcessful clear the entry fields
      this.setState({ username: '', password: '' })
      // redirect to catalog after successful login
      this.props.history.push('/catalog')
    }).catch((response) => {
      // trigger the observer so we can show a notification in case of unsuccessful login
      observer.trigger(observer.events.notification,
        { type: 'error', message: response.responseJSON.description })
    })
  }

  render () {
    return (
      <form id='loginForm' onSubmit={this.handleSubmit}>
        <h2>Log In</h2>
        <label>Username:</label>
        <input name='username' type='text' onChange={this.handleChange} value={this.state.username} />
        <label>Password:</label>
        <input name='password' type='password' onChange={this.handleChange} value={this.state.password} />
        <input id='btnLogin' type='submit' value='Log In' />
      </form>
    )
  }
}

export default LoginForm
