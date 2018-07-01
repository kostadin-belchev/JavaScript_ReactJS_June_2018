import React, { Component } from 'react'

class FormItem extends Component {
  constructor () {
    super()

    this.state = {
      inputItemName: '',
      error: ''
    }

    this.onInputChanged = this.onInputChanged.bind(this)
    this.onItemSaved = this.onItemSaved.bind(this)
  }

  onInputChanged (event) {
    this.setState({
      inputItemName: event.target.value
    })
  }

  onItemSaved (event) {
    event.preventDefault()
    // console.log(event.target.itemName.value)
    // console.log(this.state.inputItemName)
    let itemNameToAdd = this.state.inputItemName
    // validation if empty
    if (!itemNameToAdd) {
      this.setState({
        error: 'Cannot add an empty item'
      })

      return
    } else {
      this.setState({
        error: ''
      })
    }
    this.props.addItem(itemNameToAdd)
  }
  /* value={this.state.inputItemName} */
  render () {
    return (
      <form onSubmit={this.onItemSaved}>
        <div>{this.state.error}</div>
        <input type='text' name='itemName' onChange={this.onInputChanged} />
        <br />
        <br />
        <input type='submit' value='Add Item' />
      </form>
    )
  }
}

export default FormItem
