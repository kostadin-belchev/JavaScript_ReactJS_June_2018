import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import PublicHomePage from './components/PublicHomePage'
import AllCars from './components/AllCars'
import AddCarForm from './components/AddCarForm'
import About from './components/About'
import Contact from './components/Contact'
import NotFoundRoute from './components/NotFoundRoute'
import CarDetails from './components/CarDetails'

class AppRouter extends Component {
  render () {
    return (
      <Switch>
        <Route path='/' exact component={PublicHomePage} />
        <Route path='/home' component={PublicHomePage} />
        <Route path='/all/:carId' exact component={CarDetails} />
        <Route path='/all' component={AllCars} />
        <Route path='/addCar' component={AddCarForm} />
        <Route path='/about' component={About} />
        <Route path='/aboutContacts' component={Contact} />
        <Route component={NotFoundRoute} />
      </Switch>
    )
  }
}

export default AppRouter
