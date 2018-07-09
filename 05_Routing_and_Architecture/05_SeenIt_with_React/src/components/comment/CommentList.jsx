import React, { Component } from 'react'
import '../../styles/comment.css'
import Comment from './Comment'

class CommentList extends Component {
  render () {
    // console.log('this.props.comments: ')
    // console.log(this.props.comments)
    let commentNodes = this.props.comments.map((comment) => {
      // comment.isDeletable = false
      // let deleteLink
      // // eslint-disable-next-line
      // if (comment._acl.creator === sessionStorage.getItem('userId')) {
      //   comment.isDeletable = true
      //   deleteLink = <a onClick={(e) => this.props.deleteCommentFn(comment._id, e)} className='deleteLink'>delete</a>
      // }
      // comment.onDelete = this.props.deleteCommentFn
      return (
        <Comment {...comment} onDelete={this.props.deleteCommentFn} key={comment._id} />
        // <div className='comment' key={comment._id}>
        //   <article className='comment comment-content'>
        //     <p>{comment.content}</p>
        //     <div className='info'>
        //       submitted {this.calcTime(comment)} ago by {comment.author}{deleteLink ? ' | ' : null}{deleteLink}
        //     </div>
        //   </article>
        // </div>
      )
    })

    return (this.props.comments.length === 0
      ? <div className='comment-content' style={{fontStyle: 'italic'}}><p>(No comments yet)</p></div>
      : commentNodes)
  }
}

export default CommentList
