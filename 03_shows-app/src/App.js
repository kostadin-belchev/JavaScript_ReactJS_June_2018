import React, { Component } from 'react'
// import logo from './logo.svg'
import './App.css'
import Slider from './components/Slider'
import Characters from './components/Characters'

class App extends Component {
  constructor () {
    super()

    this.state = {
      epOnFocus: 0
    }

    this.changeEp = (ep) => {
      this.setState({epOnFocus: ep}) // could it say this.epOnFocus ?
    }
  }
  render() {
    return (
      <div className="container">
        <Slider updateFunc={this.changeEp} focusedEp={this.state.epOnFocus} />
        <Characters />
      </div>
    )
  }
}

export default App
