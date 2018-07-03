import React, { Component } from 'react'
// const fetch = require('node-fetch')

import DATABASE_URL from '../config/serverPort'

class LoginForm extends Component {
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

  // isFormValid () {
  //   // check if mail === confirm mail, etc.
  // }

  handleSubmit (event) {
    event.preventDefault()
    let url = DATABASE_URL + '/auth/login'
    let data = {
      email: this.state.form.email,
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
      .then(response => {
        // console.log(response)
        if (response.success && response.token) {
          // eslint-disable-next-line
          localStorage.setItem('token', response.token)
          this.props.setLogInStateFunc()
        }
      }).catch(err => console.log(err))
  }

  render () {
    return (
      <div className='Form'>
        <h2>Login form</h2>
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label htmlFor='name'>Email address</label>
            <input data-name='email' onChange={this.onInputChanged} type='email' className='form-control' id='name' aria-describedby='emailHelp' placeholder='Enter email' />
          </div>
          <div className='form-group'>
            <label htmlFor='input-password'>Password</label>
            <input data-name='password' onChange={this.onInputChanged} type='password' className='form-control' id='input-password' placeholder='Password' />
          </div>
          <button type='submit' className='btn btn-primary'>Login</button>
        </form>
      </div>
    )
  }
}

export default LoginForm
