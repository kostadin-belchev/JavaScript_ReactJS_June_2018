import React from 'react'
import '../../styles/warning.css'

export default function withWarning (WrappedComponent) {
  return class extends React.Component {
    render () {
      return <WrappedComponent {...this.props} />
    }
  }
}
