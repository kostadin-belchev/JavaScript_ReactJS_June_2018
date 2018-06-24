import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css'
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

import arrayOfContacts from '../src/contacts.json'

const renderList = () => {
  let contacts = []
  for (const contact of arrayOfContacts) {
    contacts.push(makeContact(contact, contacts.length))
  }
  return contacts
}

let contactIndex = 0

const selectDetailsContact = (index) => {
  contactIndex = index
}

const getContactDetails = (currContact) => {
    return <div className="content">
    <div className="info">
        <div className="col">
            <span className="avatar">&#9787;</span>
        </div>
        <div className="col">
            <span className="name">{currContact.firstName}</span>
            <span className="name">{currContact.lastName}</span>
        </div>
    </div>
    <div className="info">
        <span className="info-line">&#9742; {currContact.phone}</span>
        <span className="info-line">&#9993; {currContact.email}</span>
    </div>
</div>
}

const app = () => <div className="container">
    <header>&#9993; Contact Book</header>
    <div id="book">
        <div id="list">
            <h1>Contacts</h1>
            <div className="content">
                {renderList()}
            </div>
        </div>
        <div id="details">
            <h1>Details</h1>
            {getContactDetails(arrayOfContacts[contactIndex])}
        </div>
    </div>
    <footer>Contact Book SPA &copy; 2017</footer>
    </div>

function makeContact(data, index) {
  function handleClick(e) {
    e.preventDefault();
    // console.log('The link was clicked.');
    // console.log((e.target).closest('div'))
    // let clickedDiv = e.target.closest('div')
    // console.log(clickedDiv)
    // selectDetailsContact(clickedDiv.getAttribute('data-id'))
    // or
    selectDetailsContact(index)
    ReactDOM.render(app(), document.getElementById('root'))
  }
  return (
    <div className="contact" key={data.email} data-id={index} onClick={handleClick}>
        <span className="avatar small">&#9787;</span>
        <span className="title">{data.firstName} {data.lastName}</span>
    </div>
  )
}

ReactDOM.render(app(), document.getElementById('root'))
