import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css'
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

import arrayOfContacts from '../src/contacts.json'

let contacts = []
for (const contact of arrayOfContacts) {
  contacts.push(makeContact(contact))
}

const app = <div className="container">
    <header>&#9993; Contact Book</header>
    <div id="book">
        <div id="list">
            <h1>Contacts</h1>
            <div className="content">
                {contacts}
            </div>
        </div>
        <div id="details">
            <h1>Details</h1>
            <div className="content">
                <div className="info">
                    <div className="col">
                        <span className="avatar">&#9787;</span>
                    </div>
                    <div className="col">
                        <span className="name">Ivan</span>
                        <span className="name">Ivanov</span>
                    </div>
                </div>
                <div className="info">
                    <span className="info-line">&#9742; 0887 123 456</span>
                    <span className="info-line">&#9993; i.ivanov@gmail.com</span>
                </div>
            </div>
        </div>
    </div>
    <footer>Contact Book SPA &copy; 2017</footer>
    </div>

function makeContact(data) {
  return <div className="contact" data-id="id">
            <span className="avatar small">&#9787;</span>
            <span className="title">{data.firstName} {data.lastName}</span>
        </div>
}

ReactDOM.render(app, document.getElementById('root'))
