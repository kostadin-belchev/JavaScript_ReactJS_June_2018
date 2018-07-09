import React, { Component } from 'react'
import calcTime from '../../infrastructure/calcTime'

class Comment extends Component {
  render () {
    // console.log('Comment props: ')
    // console.log(this.props)
    let comment = this.props
    // comment.isDeletable = false
    let deleteLink
    // eslint-disable-next-line
    if (comment._acl.creator === sessionStorage.getItem('userId')) {
      // comment.isDeletable = true
      deleteLink = <a onClick={(e) => this.props.onDelete(comment._id, e)} className='deleteLink'>delete</a>
    }
    return (
      <div className='comment'>
        <article className='comment comment-content'>
          <p>{comment.content}</p>
          <div className='info'>
              submitted {calcTime(comment)} ago by {comment.author}{deleteLink ? ' | ' : null}{deleteLink}
          </div>
        </article>
      </div>
    )
  }
}

export default Comment
