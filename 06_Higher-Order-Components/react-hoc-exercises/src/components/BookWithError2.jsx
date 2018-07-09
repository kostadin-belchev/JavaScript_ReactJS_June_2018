import React, { Component } from 'react'

const Book = (props) => (
  <div>
    Current book 2: {props.book.name}
  </div>
)
class BookWithError2 extends Component {
  constructor (props) {
    super(props)

    this.state = {
      book: { name: 'some name 2' }
    }

    this.updateBook = this.updateBook.bind(this)
  }

  updateBook () {
    this.setState({ book: null })
  }

  render () {
    return (
      <div>
        <Book book={this.state.book} />
        <button onClick={this.updateBook}>Update</button>
      </div>
    )
  }
}

export default BookWithError2
