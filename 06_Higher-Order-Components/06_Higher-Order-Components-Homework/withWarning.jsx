import React from 'react'
import '../../styles/warning.css'

export default function withWarning (WrappedComponent) {
  return class extends React.Component {
    render () {
      return (
        <div className='alert'>
          <span className='alert-symbol'>&#9888;</span>
          <WrappedComponent {...this.props} />
        </div>
      )
    }
  }
}
