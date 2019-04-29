import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';



const Server = "http://localhost:4000/";

export default class Admin extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeAccountType = this.onChangeAccountType.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

      this.state = {
        username: '',
        password: '',
        accountType: '',
        button: false,
        added: false,
      }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }
  onChangeAccountType(e) {
    this.setState({
      accountType: e.target.value,
      button: true
      });
  }

  added() {
    if(this.state.added) {
      return (
        <p style={{color: 'green'}}> Account has been added! </p>
      );
    }
  }

  error() {
    if(!this.state.button) {
      return (
        <p style={{color: 'red'}}> Please select an account type </p>
      );
    }
  }

  onSubmit(e) {
    e.preventDefault();

    if (!this.state.button){
      return;
    }

    var newUser = {
      username: this.state.username,
      password: this.state.password,
      accountType: this.state.accountType
    };
    var serverLocation = Server + 'users/add';
    axios.post(serverLocation, newUser)
      .then(res => console.log(res.data));

    this.setState({
        username: '',
        password: '',
        accountType: '',
        button: false,
        added: true,
    })

    return <Redirect to='/'/>
  }

  render() {
    return (
      <div style={{marginTop: 10}}>
        {this.added()}
        <h3>Add User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <input  type="text"
                    className="form-control"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    required
                    />
          </div>
          <div className="form-group">
            <label>Password: </label>
            <input  type="text"
                    className="form-control"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    required
                    />
          </div>
          {this.error()}
          <div className="form-group">
          <label>Account Type: </label><br/>
          <input type="radio"
               value="admin"
               checked={this.state.accountType === "admin"}
               onChange={this.onChangeAccountType}
                required/>Admin
               <br/>
        <input type="radio"
               value="user"
               checked={this.state.accountType === "user"}
               onChange={this.onChangeAccountType}
               required/>User
          </div>



          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}
