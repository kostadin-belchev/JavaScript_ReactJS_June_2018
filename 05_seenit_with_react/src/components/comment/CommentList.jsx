import React, { Component } from 'react'
import '../../styles/comment.css'
import Comment from './Comment'

class CommentList extends Component {
  render () {
    // console.log('this.props.comments: ')
    // console.log(this.props.comments)
    let commentNodes = this.props.comments.map((comment) => {
      return (
        <Comment {...comment} onDelete={this.props.deleteCommentFn} key={comment._id} />
      )
    })

    return (this.props.comments.length === 0
      ? <div className='comment-content' style={{fontStyle: 'italic'}}><p>(No comments yet)</p></div>
      : commentNodes)
  }
}

export default CommentList
