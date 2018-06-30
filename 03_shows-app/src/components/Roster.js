import React, { Component } from 'react'

export default class Characters extends Component {
  render() {
    const images = this.props.images.map(image => (
      <div key={image.id} className='roster-image-container'>
        <img src={image.url} alt='roster elem' onClick={() => this.props.showDetailsFunc(image.id)} />
      </div>
    ))
    return (
    <section id='roster'>
      {images}
    </section>)
  }
}
