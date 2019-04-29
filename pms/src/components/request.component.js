import React, { Component } from 'react';
import axios from 'axios';

// Get request to send info to chat!
// Call data from db?
// maintain USERNAME
// make message be the request

class Request extends Component {
  constructor(props) {
    super(props);
    this.onChangeMedic = this.onChangeMedic.bind(this);
    this.onChangeFood = this.onChangeFood.bind(this);
    this.onChangeHeli = this.onChangeHeli.bind(this);
    this.onChangeVessel = this.onChangeVessel.bind(this);
    this.onChangeJet = this.onChangeJet.bind(this);
    this.onChangeLang = this.onChangeLang.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      medkits: '2',
      food: '',
      heli: false,
      vessel: false,
      jet: false,
      language: ''
    }
  }

  onChangeMedic(e) {
      this.setState({
        medkits: '' + e.target.value
      });
    }

  onChangeFood(e) {
      this.setState({
        food: e.target.value
      });
    }

  onChangeHeli(e) {
    this.setState({
      heli: e.target.checked
    });
  }

  onChangeVessel(e) {
    this.setState({
      vessel: e.target.checked
    });
  }

  onChangeJet(e) {
    this.setState({
      jet: e.target.checked
    });
  }

  onChangeLang(e) {
    this.setState({
      jet: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    var newRequest = {
      medkits: this.state.medkits,
      food: this.state.food,
      heli: this.state.heli,
      vessel: this.state.vessel,
      jet: this.state.jet
    };

    var serverLocation = "http://localhost:4000/requests";
      axios.post(serverLocation, newRequest)
        .then(res => console.log(res.data));

      this.setState({
        medkits: '0',
        food: '0',
        heli: false,
        vessel: false,
        jet: false
      });
    }

  render() {

    return (
      <div>
      <form onSubmit={this.onSubmit} className="modal-content animate">
          <label>Supplies <br/> (One per Person)</label>
          <label>
            <input  type="number"
                    style={{width: "50px", borderStyle: "dotted"}}
                    onChange={this.onChangeMedic}
                    />
            <b>Medical</b>
          </label>
          <label >
          <input  type="number"
                  style={{width: "50px", borderStyle: "dotted"}}
                  onChange={this.onChangeMedic}
                  />
            <b>Food & Water</b>
          </label>
          <label>Military Support</label>
          <ul>
          <label>
            <input  type="checkbox"
                      onChange={this.onChangeHeli}
                      />
            <b>Helicopter</b>

          </label>
          <label >
            <input  type="checkbox"
                      onChange={this.onChangeVessel}
                      />
            <b>Vessel</b>
          </label>
          <label>
            <input  type="checkbox"
                    onChange={this.onChangeJet}
                    />
            <b>Fighter Jet</b>
          </label>
          </ul>
          <label>Negotiator (Language)</label>
          <input list="languages" onChange={this.onChangeLang} style ={{width: "100px"}} />
          <datalist id="languages">
    <option value="English">English</option>
    <option value="French">French</option>
    <option value="Spanish">Spanish</option>
    <option value="Italian">Italian</option>
          </datalist>
          <br/>
          {this.props.children}
          <input type="submit" value="Make Request"/>
      </form>
    </div>

    );
  }
}

export default Request;
