import React, { Component } from 'react'

class List extends Component {
  render () {
    let styleObj = {fontStyle: 'italic'}
    let items = this.props.items || [{id: -1, name: (<label style={styleObj}>No items in list</label>)}]
    return (
      <div>
        <strong>List:</strong>
        {items.map((item) => (<li key={item.id}>{item.name}</li>))}
      </div>
    )
  }
}

export default List
