import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import CreateUser from './addUser.component';
import AllUsers from './allUsers.component';

const Server = "http://localhost:4000/";

export default class PlantList extends Component {
  constructor(props) {
    super(props);
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

  // handleDelete= () => {
  //   axios.post('http://localhost/trays/remove'+this.props.match.params.id)
  //     .then(res => console.log(res.data));
  // };



  render() {
    return (
      <div>
        <Container>
        <Row>
          <Col><AllUsers/></Col>
          <Col><CreateUser/></Col>
        </Row>
        </Container>
      </div>
    )
  }
}
