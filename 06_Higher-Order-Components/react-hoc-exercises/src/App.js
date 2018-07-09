import React, { Component } from 'react'
// import Article from './components/Article'
// import Register from './components/Register'
// import Navigation from './components/Navigation'
import BookWithError from './components/BookWithError'
import ErrorBoundary from './components/helpers/ErrorBoundary'
import BookWithError2 from './components/BookWithError2'
import BuggyCounter from './components/BuggyCounter'
import BoundForm from './components/BoundForm'

// from API
function onSubmit (data, e) {
  console.log(data)
}

class App extends Component {
  render () {
    return (
      <span>
        Error Notifications:
        <span>
          <BookWithError />
        </span>
        <ErrorBoundary>
          <div>
            Inside of ErrorBoundary:
            <BookWithError2 />
            <BuggyCounter />
          </div>
        </ErrorBoundary>
        <div>
          Outside of ErrorBoundary:
          <BuggyCounter />
        </div>
        <hr />
        Bound Forms:
        <BoundForm onSubmit={onSubmit}>
          Username:
          <input type='text' name='username' />
          Password:
          <input type='password' name='password' />
          <input type='submit' value='Login' />
        </BoundForm>
        <BoundForm onSubmit={onSubmit}>
          Email:
          <input type='text' name='email' />
          Message:
          <textarea type='text' name='message' />
          <input type='submit' value='Send' />
        </BoundForm>
      </span>
    )
  }
}

export default App
