import React, { Component } from 'react'
import '../../styles/warning.css'

class ErrorBoundary extends Component {
  constructor (props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch (error, info) {
    if (error) {
      // sendToErrorReportingService(error, info)
      // OR just print it on console for now
      // console.log('error: ')
      // console.log(error)
      // console.log('info: ')
      // console.log(info)
      this.setState({ hasError: true, error, info })
    }
  }

  render () {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className='alert'>
          <span className='alert-symbol'>&#9888;</span>
          <span>An error occured in the following element/s:</span>
          <span>{this.state.error.message}</span>
          {this.props.children}
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
