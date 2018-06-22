import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import logo from './logo.svg'
import './App.css'
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
let counter = 0
let actionLink = () => {
  function handleClick(e) {
    e.preventDefault()
    console.log('The button was clicked.')
    counter++
    console.log(counter)
    // console.log(app)
    ReactDOM.render(app(), document.getElementById('root'))
  }

  return (
    <div>
        <div className="App-title">Counter: {counter}</div>
        <button onClick={handleClick}>Increment counter</button>
    </div>
  )
}
// we do it as a function because if we leave it as constant, becuase we need to re-render it with the new counter value that we update in handleClick function
// othewise for react if we leave it as const, the element has not changed and it still conserves the initial value of counter set to 0
const app = () => <div className="App">
    <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Counter App</h1>
    </header>
    <div className="App-intro">
        {actionLink()}
    </div>
</div>

ReactDOM.render(app(), document.getElementById('root'))
