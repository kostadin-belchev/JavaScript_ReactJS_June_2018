import React, { Component } from 'react'
import './App.css'
import './styles/site.css'
import './styles/submit.css'
import Header from './components/common/Header'
import AppRouter from './AppRouter'
import Footer from './components/common/Footer'
import Notification from './components/common/Notification'

class App extends Component {
  render () {
    return (
      <div>
        <div id='container'>
          <Header />
          <AppRouter />
          <Footer />
        </div>
        <Notification />
      </div>
    )
  }
}

export default App
