import React, { Component } from 'react'
// const fetch = require('node-fetch')

import DATABASE_URL from '../../config/serverPort'

class LoginForm extends Component {
  constructor () {
    super()

    this.state = {
      form: {}
    }
    this.onInputChanged = this.onInputChanged.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  onInputChanged (event) {
    event.preventDefault()
    const name = event.target.dataset.name
    const value = event.target.value
    const newForm = {}
    newForm[name] = value
    this.setState({
      form: Object.assign(this.state.form, newForm)
    })
    // console.log(this.state.form)
  }

  // isFormValid () {
  //   // check if mail === confirm mail, etc.
  // }

  handleSubmit (event) {
    event.preventDefault()
    let url = DATABASE_URL + '/pokedex/create'
    var data = this.state.form
    // eslint-disable-next-line
    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        // console.log('Success:', response)
        this.props.updateRosterFunc()
      })
  }

  render () {
    return (
      <div className='Form'>
        <h2>Logged in form</h2>
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label htmlFor='name'>Pokemon name</label>
            <input data-name='pokemonName' onChange={this.onInputChanged} type='text' className='form-control' id='name' aria-describedby='nameHelp' placeholder='Enter pokemon name' />
          </div>
          <div className='form-group'>
            <label htmlFor='imageUrl'>Pokemon image</label>
            <input data-name='pokemonImg' onChange={this.onInputChanged} type='text' className='form-control' id='imageUrl' aria-describedby='nameHelp' placeholder='Enter pokemon image URL' />
          </div>
          <div className='form-group'>
            <label htmlFor='info'>Pokemon info</label>
            <input data-name='pokemonInfo' onChange={this.onInputChanged} type='text' className='form-control' id='info' aria-describedby='nameHelp' placeholder='Enter pokemon description' />
          </div>
          <button type='submit' className='btn btn-primary'>Create Pokemon</button>
        </form>
      </div>
    )
  }
}

export default LoginForm
