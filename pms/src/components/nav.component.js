import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Outline from "./outline.component";
import Admin from "./admin/admin.component";

// import "bootstrap/dist/css/bootstrap.min.css";

import logo from "./../logo.JPG";

class House extends Component {

  // complete admin component
  // simple form for adding Users
  // to start just input username, password, and accountType
  // from there modify to Name and Country

  //


  ifAdmin() {
    if (this.props.admin){
      return (
        <li className="navbar-item">
          <Link to="/admin" className="nav-link">Users</Link>
        </li>
      );
    }
  }

  render() {

    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">

              <Link to="/" className="navbar-brand">
                <img src={logo} width="30" height="30" alt="/" />
              </Link>

            <Link to="/" className="navbar-brand">Pirate Fighting Crisis Management System</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
              {this.ifAdmin()}
              </ul>
            </div>
          </nav>
          <br/>
          <Route path="/" exact render={(props) => <Outline user= {this.props.user}/>} />
          <Route path="/admin" component={Admin} />
        </div>
      </Router>

    );
  }
}

export default House
