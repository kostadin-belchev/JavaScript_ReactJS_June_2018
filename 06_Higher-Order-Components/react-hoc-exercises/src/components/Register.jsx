import React, { Component } from 'react'
import withWarning from './helpers/withWarning'

class RegisterBase extends Component {
  render () {
    return (
      <div>
        <header><span className='title'>Register</span></header>
        <form>
          Username:
          <input type='text' /><br />
          Email:
          <input type='text' /><br />
          Password:
          <input type='password' /><br />
          Repeat Password:
          <input type='password' /><br />
          <input type='submit' defaultValue='Register' />
        </form>
      </div>
    )
  }
}

const Register = withWarning(RegisterBase)

export default Register
