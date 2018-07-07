import React, { Component } from 'react'
import '../../styles/comment.css'

class CommentList extends Component {
  // HELPER FUNCTION FOR TIME
  calcTime (element) {
    let dateIsoFormat = element._kmd.ect
    let diff = new Date() - (new Date(dateIsoFormat))
    diff = Math.floor(diff / 60000)
    if (diff < 1) return 'less than a minute'
    if (diff < 60) return diff + ' minute' + pluralize(diff)
    diff = Math.floor(diff / 60)
    if (diff < 24) return diff + ' hour' + pluralize(diff)
    diff = Math.floor(diff / 24)
    if (diff < 30) return diff + ' day' + pluralize(diff)
    diff = Math.floor(diff / 30)
    if (diff < 12) return diff + ' month' + pluralize(diff)
    diff = Math.floor(diff / 12)
    return diff + ' year' + pluralize(diff)

    function pluralize (value) {
      if (value !== 1) return 's'
      else return ''
    }
  }
  render () {
    // console.log('this.props.comments: ')
    // console.log(this.props.comments)
    return (this.props.comments.length === 0
      ? <div className='comment-content' style={{fontStyle: 'italic'}}><p>(No comments yet)</p></div>
      : this.props.comments.map((comment, index) => {
        comment.isDeletable = false
        let deleteLink
        // eslint-disable-next-line
        if (comment._acl.creator === sessionStorage.getItem('userId')) {
          comment.isDeletable = true
          deleteLink = <a onClick={(e) => this.props.deleteCommentFn(comment._id, e)} className='deleteLink'>delete</a>
        }
        return (
          <div className='comment' key={comment._id}>
            <article className='comment comment-content'>
              <p>{comment.content}</p>
              <div className='info'>
                submitted {this.calcTime(comment)} ago by {comment.author}{deleteLink ? ' | ' : null}{deleteLink}
              </div>
            </article>
          </div>
        )
      }))
  }
}

export default CommentList
