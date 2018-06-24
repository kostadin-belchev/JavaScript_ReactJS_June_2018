import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css'
import logo from './logo.svg';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

function clock() {
    const app = <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Timer App</h1>
        </header>
        <p className="App-intro">
          <div><p className="italic-p">Real time is: </p>{new Date().toLocaleTimeString('en-GB')}</div>
        </p>
      </div>
  ReactDOM.render(app, document.getElementById('root'))
}

setInterval(clock, 1000)
