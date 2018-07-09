import React from 'react'
import '../../styles/warning.css'

export default function withErrorCatcher (WrappedComponent) {
  return class extends React.Component {
    constructor (props) {
      super(props)

      this.state = {
        hasError: false,
        error: '',
        info: ''
      }
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
        return (
          <div className='alert'>
            <span className='alert-symbol'>&#9888;</span>
            <span>The following error occured:</span>
            <span>{this.state.error.message}</span>
            {/* <WrappedComponent {...this.props} /> */}
          </div>
        )
      } else {
        return <WrappedComponent {...this.props} />
      }
    }
  }
}
