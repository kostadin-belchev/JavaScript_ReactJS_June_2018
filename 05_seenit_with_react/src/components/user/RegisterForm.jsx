import React, { Component } from 'react'
import auth from '../../infrastructure/auth'
import observer from '../../infrastructure/observer'

class RegisterForm extends Component {
  constructor () {
    super()

    this.state = {
      username: null,
      password: null// ,
      // passwordsMatch: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    const fieldName = event.target.name
    const fieldValue = event.target.value
    this.setState({ [fieldName]: fieldValue })
    // if (this.state.password === this.state.repeatPass) {
    //   this.setState({ passwordsMatch: true })
    // } else {
    //   this.setState({ passwordsMatch: false })
    // }
    // console.log(this.state)
  }

  handleSubmit (event) {
    event.preventDefault()
    // validate if passwords match
    // register user
    auth.register(this.state.username, this.state.password).then((response) => {
      console.log(response)
      // trigger the observer so we can update the header
      observer.trigger(observer.events.loginUser, response.username)
      // eslint-disable-next-line
      sessionStorage.setItem('authtoken', response._kmd.authtoken)
    })
  }

  render () {
    return (
      <form id='registerForm' onSubmit={this.handleSubmit}>
        <h2>Register</h2>
        <label>Username:</label>
        <input name='username' type='text' onChange={this.handleChange} />
        <label>Password:</label>
        <input name='password' type='password' onChange={this.handleChange} />
        <label>Repeat Password:</label>
        <input name='repeatPass' type='password' onChange={this.handleChange} />
        <small>{this.state.passwordsMatch ? null : 'Passwords should match'}</small>
        <input id='btnRegister' type='submit' value='Sign Up' />
      </form>
    )
  }
}

export default RegisterForm
