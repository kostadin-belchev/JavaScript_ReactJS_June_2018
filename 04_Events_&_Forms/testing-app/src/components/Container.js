import React, { Component } from 'react'
import List from '../components/List'
import FormItem from '../components/FormItem'

class Container extends Component {
  constructor () {
    super()

    this.state = {
      items: []
    }

    this.addItem = this.addItem.bind(this)
  }

  addItem (itemName) {
    this.setState((prevState) => {
      let items = prevState.items
      items.push({
        id: items.length + 1,
        name: itemName
      })

      return { items }
    })
  }

  render () {
    return (
      <div>
        <List items={this.state.items} />
        <FormItem addItem={this.addItem} />
      </div>
    )
  }
}

export default Container
