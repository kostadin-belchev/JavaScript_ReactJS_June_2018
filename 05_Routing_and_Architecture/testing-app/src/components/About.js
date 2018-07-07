import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Contact from '../components/Contact'

class About extends Component {
  render () {
    return (
      <div>
        <h1>About Page</h1>
        <Route path={this.props.match.url + '/contacts'} component={Contact} />
      </div>
    )
  }
}

export default About
