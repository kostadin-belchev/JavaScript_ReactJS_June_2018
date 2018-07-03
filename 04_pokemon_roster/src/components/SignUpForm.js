import React, { Component } from 'react'
// const fetch = require('node-fetch')

import DATABASE_URL from '../config/serverPort'

class SignUpForm extends Component {
  constructor () {
    super()

    this.state = {
      form: {}
    }
    this.onInputChanged = this.onInputChanged.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  onInputChanged (event) {
    event.preventDefault()
    const name = event.target.dataset.name
    const value = event.target.value
    const newForm = {}
    newForm[name] = value
    this.setState({
      form: Object.assign(this.state.form, newForm)
    })
    // console.log(this.state.form)
  }

  isRepeatPasswordValid () {
    // check if password === repeatPassword
    if (this.state.form.password === this.state.form.repeatPassword) {
      return true
    } else {
      return false
    }
  }

  isConfirmEmailValid () {
    // check if email === confirmPassword
    if (this.state.form.email === this.state.form.confirmEmail) {
      return true
    } else {
      return false
    }
  }

  handleSubmit (event) {
    event.preventDefault()
    let url = DATABASE_URL + '/auth/signup'
    if (!this.isRepeatPasswordValid()) {
      return
    }
    if (!this.isConfirmEmailValid()) {
      return
    }
    let data = {
      email: this.state.form.email,
      name: this.state.form.username,
      password: this.state.form.password
    }
    // eslint-disable-next-line
    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response))
  }

  render () {
    let passwordsMatch
    if (this.isRepeatPasswordValid()) {
      passwordsMatch = undefined
    } else {
      passwordsMatch = 'Confirm password should match'
    }
    let emailsMatch
    if (this.isConfirmEmailValid()) {
      emailsMatch = undefined
    } else {
      emailsMatch = 'Confirm email should match'
    }
    return (
      <div className='Form'>
        <h2>Sign up form</h2>
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label htmlFor='name'>Email address</label>
            <input data-name='email' onChange={this.onInputChanged} type='email' className='form-control' id='name' aria-describedby='emailHelp' placeholder='Enter email' />
            <small id='emailHelp' className='form-text text-muted'>We'll never share your email with anyone else.</small>
          </div>
          <div className='form-group'>
            <label htmlFor='confirmEmail'>Confirm email address</label>
            <input data-name='confirmEmail' onChange={this.onInputChanged} type='email' className='form-control' id='confirmEmail' aria-describedby='emailHelp' placeholder='Enter email' />
            <small id='confirmEmailHelp' className='form-text text-muted'>{emailsMatch}</small>
          </div>
          <div className='form-group'>
            <label htmlFor='input-username'>Username</label>
            <input data-name='username' onChange={this.onInputChanged} type='text' className='form-control' id='input-username' placeholder='Enter username' />
          </div>
          <div className='form-group'>
            <label htmlFor='input-password'>Password</label>
            <input data-name='password' onChange={this.onInputChanged} type='password' className='form-control' id='input-password' placeholder='Password' />
          </div>
          <div className='form-group'>
            <label htmlFor='input-confirm-password'>Repeat Password</label>
            <input data-name='repeatPassword' onChange={this.onInputChanged} type='password' className='form-control' id='input-confirm-password' placeholder='Repeat Password' />
            <small id='passwordHelp' className='form-text text-muted'>{passwordsMatch}</small>
          </div>
          <div className='form-group form-check'>
            <input type='checkbox' className='form-check-input' id='exampleCheck1' />
            <label className='form-check-label' htmlFor='exampleCheck1'>I agree with the terms and conditions of this website</label>
          </div>
          <button type='submit' className='btn btn-primary'>Sign up</button>
          {/* <div>
            <small id='signupHelp' className='form-text text-muted'>Already signed up? Login from <button onClick={} className='btn btn-link'>here</button>.</small>
          </div> */}
        </form>
      </div>
    )
  }
}

export default SignUpForm
