import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';

const Server = "http://localhost:4000/";

var User = props => (
  <tr>
    <td>{props.user.username}</td>
    <td>{props.user.password}</td>
    <td>{props.user.accountType}</td>
    <td><button> Remove </button></td>
    <td></td>
  </tr>
)

export default class UserList extends Component {
  constructor(props) {
    super(props);
      this.remove = this.remove.bind(this);
      this.state = {users: []};
  }

  componentDidMount() {
    var serverLocation = Server + 'users/';
    axios.get(serverLocation)
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch(function (error){
        console.log(error);
      });
  }

  remove() {
    var serverLocation = Server + 'users/remove/' + this.props.match.params.id;
    axios.delete(serverLocation, )
      .then(res => {
        console.log('deleted user');
      })
      .catch(function (err){
        console.log(err);
      })
  }

  // handleDelete= () => {
  //   axios.post('http://localhost/trays/remove'+this.props.match.params.id)
  //     .then(res => console.log(res.data));
  // };

  user_List() {
    return this.state.users.map(function(currentUser, user) {
      return <User user={currentUser} key={user._id} />
    })
  }

  render() {
    return (
      <div>
        <h3 >User List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }} >
          <thead>
            <tr>
              <th>Username</th>
              <th>Password</th>
              <th>Account Type</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { this.user_List() }
          </tbody>
        </table>
        <br/>
      </div>

    )
  }
}
