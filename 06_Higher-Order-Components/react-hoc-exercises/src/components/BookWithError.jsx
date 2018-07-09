import React, { Component } from 'react'
import withErrorCatcher from './helpers/withErrorCatcher'

const Book = (props) => (
  <div>
    Current book: {props.book.name}
  </div>
)
class BookWithErrorBase extends Component {
  constructor (props) {
    super(props)

    this.state = {
      book: { name: 'some name' },
      error: null
    }

    this.updateBook = this.updateBook.bind(this)
  }

  updateBook () {
    try {
      // Do something that could throw
      this.setState({ book: null })
    } catch (error) {
      this.setState({ error })
    }
  }

  render () {
    console.log(this.state)
    if (this.state.error) {
      return (<div className='alert'>
        <span className='alert-symbol'>&#9888;</span>
        <span>An error occured here! Error: </span>
        <br />
        <span>{this.state.error.message}</span>
      </div>
      )
    }
    return (
      <div>
        withErrorCatcher:
        <Book book={this.state.book} />
        <button onClick={this.updateBook}>Update</button>
      </div>
    )
  }
}

const BookWithError = withErrorCatcher(BookWithErrorBase)

export default BookWithError
