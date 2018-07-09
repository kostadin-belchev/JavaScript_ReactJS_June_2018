import React, { Component } from 'react'
import calcTime from '../../infrastructure/calcTime'

class Post extends Component {
  render () {
    let isEditableContent
    let isDeletableContent
    if (this.props.isEditable) {
      isEditableContent = <li className='action'><a className='editLink' href={`/editPost/${this.props._id}`}>edit</a></li>
      isDeletableContent = <li className='action'><a className='deleteLink' href={`/deletePost/${this.props._id}`}>delete</a></li>
    }
    return (
      <article className='post'>
        <div className='col rank'>
          <span>{this.props.rank + 1}</span>
        </div>
        <div className='col thumbnail'>
          <a href={this.props.url}>
            <img src={this.props.imageUrl} alt='post' />
          </a>
        </div>
        <div className='post-content'>
          <div className='title'>
            <a href={this.props.url}>
              {this.props.title}
            </a>
          </div>
          <div className='details'>
            <div className='info'>
              submitted {calcTime(this.props)} ago by {this.props.author}
            </div>
            <div className='controls'>
              <ul>
                <li className='action'><a className='commentsLink' href={`/postDetails/${this.props._id}`}>comments</a></li>
                {isEditableContent}
                {isDeletableContent}
              </ul>
            </div>
          </div>
        </div>
      </article>
    )
  }
}

export default Post
