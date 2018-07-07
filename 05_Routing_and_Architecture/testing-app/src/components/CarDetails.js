import React, { Component } from 'react'

class CarDetails extends Component {
  render () {
    return (
      <div>
        <h2>Car ID: {this.props.match.params.carId}</h2>
      </div>
    )
  }
}

export default CarDetails
