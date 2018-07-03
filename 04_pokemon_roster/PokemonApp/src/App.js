import React, { Component } from 'react'
import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'

import SignUpForm from './components/SignUpForm'
import LoginForm from './components/LoginForm'
import LoggedInScreen from './components/logged-in/LoggedInScreen'

class App extends Component {
  constructor () {
    super()
    let route = ''
    // eslint-disable-next-line
    if (localStorage.getItem('token')) {
      route = 'loggedIn'
    }
    this.state = {
      route
    }

    this.showAppropriateComponent = this.showAppropriateComponent.bind(this)
    this.switchToLoginFormLink = this.switchToLoginFormLink.bind(this)
    this.setLoginState = this.setLoginState.bind(this)
  }

  switchToLoginFormLink () {
    if (this.state.route === 'login') {
      this.setState({ route: 'signup' })
    } else {
      this.setState({ route: 'login' })
    }
  }

  setLoginState () {
    this.setState({ route: 'loggedIn' })
  }

  showAppropriateComponent () {
    if (this.state.route === 'login') {
      return <LoginForm setLogInStateFunc={this.setLoginState} />
    } else if (this.state.route === 'loggedIn') {
      return <LoggedInScreen />
    }
    return <SignUpForm />
  }
  render () {
    return (
      <div className='App'>
        <div>
          <button onClick={this.switchToLoginFormLink} className='btn btn-link'>Go to login/sign up page</button>
        </div>
        <div>{this.showAppropriateComponent()}</div>
      </div>
    )
  }
}

export default App
