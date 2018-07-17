import React, { Component } from 'react'
import auth from '../../infrastructure/auth'
import validateRegisterFields from '../../infrastructure/validateRegisterFields'
import saveSession from './../../infrastructure/saveSession'
import observer from '../../infrastructure/observer'

class RegisterForm extends Component {
  constructor () {
    super()

    this.state = {
      username: '',
      password: '',
      repeatPass: ''
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
    // validate register fields
    if (!validateRegisterFields(this.state.username, this.state.password, this.state.repeatPass)) {
      return
    }
    // register user
    auth.register(this.state.username, this.state.password).then((response) => {
      // console.log(response)
      // trigger the observer so we can show a notification in case of successful registration
      observer.trigger(observer.events.notification, { type: 'success', message: 'User registration successful.' })
      saveSession(response)
      // if register succcessful clear the entry fields
      this.setState({ username: '', password: '', repeatPass: '' })
      // redirect to catalog after successful login
      this.props.history.push('/catalog')
    }).catch((response) => {
      // trigger the observer so we can show a notification in case of unsuccessful login
      observer.trigger(observer.events.notification, { type: 'error', message: response.responseJSON.description })
    })
  }

  render () {
    return (
      <form id='registerForm' onSubmit={this.handleSubmit}>
        <h2>Register</h2>
        <label>Username:</label>
        <input name='username' type='text' onChange={this.handleChange} value={this.state.username} />
        <label>Password:</label>
        <input name='password' type='password' onChange={this.handleChange} value={this.state.password} />
        <label>Repeat Password:</label>
        <input name='repeatPass' type='password' onChange={this.handleChange} value={this.state.repeatPass} />
        <input id='btnRegister' type='submit' value='Sign Up' />
      </form>
    )
  }
}

export default RegisterForm
