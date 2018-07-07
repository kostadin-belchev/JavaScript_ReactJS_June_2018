import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NotFoundRoute extends Component {
  render () {
    return (
      <div>
        <h2>Route not found. Please return <Link to='/home'>home</Link></h2>
      </div>
    )
  }
}

export default NotFoundRoute
