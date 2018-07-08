import React, { Component } from 'react'

class CommentForm extends Component {
  constructor () {
    super()

    this.state = {
      content: ''
    }

    this.handleContentChange = this.handleContentChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (event) {
    event.preventDefault()
    let content = this.state.content.trim()
    // validate for empty comment
    if (!content) {
      return
    }

    this.props.onCommentSubmit(content)
    this.setState({ content: '' })
  }

  handleContentChange (event) {
    this.setState({ content: event.target.value })
    // or
    // const fieldName = event.target.name
    // const fieldValue = event.target.value
    // this.setState({ [fieldName]: fieldValue })
    // console.log(this.state)
  }

  render () {
    // console.log(this.props)
    return (
      <div className='post post-content'>
        <form id='commentForm' onSubmit={this.handleSubmit}>
          <label>Comment</label>
          <br />
          <textarea name='content' type='text' value={this.state.content} onChange={this.handleContentChange} />
          <br />
          <input type='submit' defaultValue='Add Comment' id='btnPostComment' />
        </form>
      </div>
    )
  }
}

export default CommentForm
