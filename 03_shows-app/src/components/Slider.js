import React, { Component } from 'react'
import left from '../resources/left.png'
import right from '../resources/right.png'

const DATABASE_PORT = 6349


class Slider extends Component {
  constructor () {
    super()

    this.state = {
      selectedImg: null
    }

    this.promisfyState = obj => {
      return new Promise(res => {
        this.setState(obj, res)
      }).catch(e => {
        console.log(e)
      })
    }
  }
  componentWillReceiveProps () {
    fetch(`http://localhost:${DATABASE_PORT}/episodePreview/` + this.props.focusedEp)
    .then(data => data.json())
    .then(parseData => {
      this.promisfyState({ selectedImg: parseData.url }).then(() => {
        console.log('loaded new state')
      })
    })
  }

  componentDidMount () {
    fetch(`http://localhost:${DATABASE_PORT}/episodePreview/` + this.props.focusedEp)
    .then(data => data.json())
    .then(parseData => {
      this.promisfyState({ selectedImg: parseData.url }).then(() => {
        console.log('mount')
      })
    })
  }
  render () {
    return (
      <div> 
        <section id='slider'>
          <img alt='nope' src={left} title='previous' className='slider-elem slider-button case-left'
          onClick={() => 
            this.props.updateFunc(
              Number(this.props.focusedEp) - 1 < 0 
                ? 0 
                : Number(this.props.focusedEp) - 1
            )}
          />
          <img className='image-container' alt='focusedEp' src={this.state.selectedImg} />
          <img alt='nope' src={right} title='next' className='slider-elem slider-button case-right'
          onClick={() =>
            this.props.updateFunc(
              Number(this.props.focusedEp) + 1 > 2
                ? 2
                : Number(this.props.focusedEp) + 1
            )}
          />
        </section>
      </div>
    )
  }
}

export default Slider