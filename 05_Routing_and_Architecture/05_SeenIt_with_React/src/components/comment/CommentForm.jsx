import React, { Component } from 'react'

class CommentForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      content: ''
    }

    this.handleChange = this.handleChange.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
  }

  // handleSubmit (event) {
  //   event.preventDefault()
  //   console.log(this.state)
  //   console.log('submitting from form')
  //   // this.props.addCommentFn.bind(this, this.state.content)
  // }

  handleChange (event) {
    const fieldName = event.target.name
    const fieldValue = event.target.value
    this.setState({ [fieldName]: fieldValue })
    // console.log(this.state)
  }

  render () {
    // console.log(this.props)
    return (
      <div className='post post-content'>
        <form id='commentForm' onSubmit={(e) => {
          e.preventDefault()
          // console.log('this.props.postId from onSubmit ' + this.props.postId)
          this.props.addCommentFn(this.state.content, this.props.postId)
          this.setState({ content: '' })
        }}>
          <label>Comment</label>
          <br />
          <textarea name='content' type='text' value={this.state.content} onChange={this.handleChange} />
          <br />
          <input type='submit' defaultValue='Add Comment' id='btnPostComment' />
        </form>
      </div>
    )
  }
}

export default CommentForm
