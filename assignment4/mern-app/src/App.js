import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route} from "react-router-dom";

import Register from "./Components/register.component";
import Login from "./Components/login.component";
import Contacts from "./Components/contacts.component";
import EditContact from "./Components/editcontact.component";
import AddContact from "./Components/addcontact.component";
//import logo from './logo.svg';
//import './App.css';

function App() {
/*  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );*/

  return(
    <Router>
      <Route path="/home/:id" component={Contacts} />
      <Route path="/add/:id" component={AddContact} />
      <Route path="/edit/:id/:contact" component={EditContact} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      
    </Router>

  )

}

export default App;
