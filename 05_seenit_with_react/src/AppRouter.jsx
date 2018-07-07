import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './components/common/Home'
import Logout from './components/user/Logout'
import Catalog from './components/catalog/Catalog'
import SubmitPost from './components/post/SubmitPost'
import EditPost from './components/post/EditPost'
import DeletePost from './components/post/DeletePost'
import MyPosts from './components/catalog/MyPosts'
import NotFoundRoute from './components/common/NotFoundRoute'
import PostDetails from './components/post/PostDetails'

class AppRouter extends Component {
  render () {
    return (
      <div className='content'>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/logout' component={Logout} />
          <Route path='/catalog' component={Catalog} />
          <Route path='/submit' component={SubmitPost} />
          <Route path='/editPost/:id' component={EditPost} />
          <Route path='/deletePost/:id' component={DeletePost} />
          <Route path='/myPosts' component={MyPosts} />
          <Route path='/postDetails/:id' component={PostDetails} />
          {/* <Route path='/deleteComment/:id' component={DeleteComment} /> */}
          <Route component={NotFoundRoute} />
        </Switch>
      </div>
    )
  }
}

export default AppRouter
