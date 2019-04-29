import React, { Component } from 'react';

import Map from "./map.component";
import Chat from "./chat.component";
import Request from "./request.component";

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';


class Outline extends Component {
  // takes 1 condition (username) for Chat

  // We need to store shipLocation in the DB and modify conditions so they cannot overlap, this might be in the other project
  // so just import the new functions
  // possible to make bigger and provide 'Off-Limit Land'

  // chat -- this is going to be tricky to work with socket.io for this one but doable
  // need to provide information about locations and distances

  // Request <<---- Start Here
  // post request to server as well as to chat
  // request is a form like login, work from that base
  // make sure requests go to the DB
  // then set up chat?


  render() {

    return (
      <div>
        <Container>
          <Row>
            <Col xs='4'>
              <Request/>
            </Col>
            <Col xs='8'>
              <Chat user={this.props.user}/>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Outline;
