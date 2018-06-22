import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css'
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

function clock() {
  const app = <div>
        <h1>Timer App</h1>
        <div><p className="italic-p">Real time is: </p>{new Date().toLocaleTimeString()}</div>
    </div>
  ReactDOM.render(app, document.getElementById('root'))
}

setInterval(clock, 1000)
