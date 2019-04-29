import React, { Component } from 'react';
import axios from 'axios';

import Map from "./components/map.component";
import House from "./components/house.component";


import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css";


import logo from "./logo.JPG";


class App extends Component {
  constructor(props) {
    super(props);
    this.onChangePass = this.onChangePass.bind(this);
    this.onChangeUser = this.onChangeUser.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      username: '',
      password: '',
      login: true,
      admin: false
    }
  }

  onChangeUser(e) {
      this.setState({
        username: e.target.value
        });
    }
  onChangePass(e) {
      this.setState({
        password: e.target.value
        });
    }


  display() {
    if (!this.state.login){
      return <div> <div> <House admin={this.state.admin} user={this.state.username}/> </div>  </div>
    }
    else {
      // login form
      return (
        <div className="login">
          <img src={logo} width="100" height="100" className="center"/>
        <h1> Pirate Crisis OS </h1>
        <form className="modal-content animate">
            <label><b>Username: </b></label>
            <input  type="text"
                        onChange={this.onChangeUser}
                        required
                      />
                    <br/>
                  <label ><b>Password: </b></label>
            <input  type="password"
                        onChange={this.onChangePass}
                        required
                        />
                      {this.props.children} <br/>

            <button  onClick={this.onSubmit}> Login </button>

        </form>
      </div>
      );
    }
  }

  onSubmit(e) {
    e.preventDefault();

    var serverLocation = "http://localhost:4000/users/" + this.state.username;
      axios.get(serverLocation)
      .then(res => {
        // check password
        var correctPass = res.data.password;
        if (this.state.password === correctPass){
          this.setState({
            login: false
          });
          console.log('switch');
        }
        // check account type
        if (res.data.accountType === 'admin'){
          this.setState({
            admin: true
          });
        }
    })
    .catch(function (error){
      console.log(error);
    });
  }

  render() {
    return (
        <div>
        {this.display()}
        </div>
    );
  }
}

export default App;
