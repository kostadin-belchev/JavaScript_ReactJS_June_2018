import React, { Component } from 'react'

class Post extends Component {
  // HELPER FUNCTION FOR TIME
  calcTime () {
    let dateIsoFormat = this.props._kmd.ect
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
              submitted {this.calcTime()} ago by {this.props.author}
            </div>
            <div className='controls'>
              <ul>
                <li className='action'><a className='commentsLink' href='#'>comments</a></li>
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
