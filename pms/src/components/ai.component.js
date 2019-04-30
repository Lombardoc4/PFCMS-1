import React from "react";
import axios from 'axios';

const Server = "http://localhost:4000/";



class Ai extends React.Component{

  // IMPORT USERNAME VALUE AND MODIFY VISUALLY
    constructor(props){
        super(props);
        this.aiList = this.aiList.bind(this);
        this.aiLoad = this.aiLoad.bind(this);
        this.messageInit = this.messageInit.bind(this);
        this.initLoad = this.initLoad.bind(this);
        this.state = {
          messages: [],
          eventloc: '',
          supplyloc: '',
          militaryloc: '',
          negotiatorloc: '',
          initial: true,
          eventStatus : false,
          supportStatus : false,
          status: 'good'
        };
      }

    componentDidMount() {
      this.timerID = setInterval(
        () => this.aiLoad(),
        3000
      );
    }

    componentWillUnmount() {
      clearInterval(this.timerID);
    }

    aiLoad() {
      console.log(this.state.status);
      if (this.state.status === 'good'){
        var threat = Math.floor(Math.random() * 10) + 1;
        if (threat === 3) {
          var eventLocation;
          if (!this.state.eventStatus) {
            eventLocation = Math.floor(Math.random() * 15) + 1;
            eventLocation = eventLocation + '' + Math.floor(Math.random() * 18) + 1;
            this.setState({
              eventloc: eventLocation
            })
          }
          this.setState({
            eventStatus : true,
            status:'threat'
          });
          // generate threat location

        }
      }
      if (this.state.status === 'threat'){
        var attack = Math.floor(Math.random() * 5) + 1;
        if (attack === 2) {
          var supply1, supply2;
          var military1, military2, military3;
          var negotiator1, negotiator2, negotiator3
          if (!this.state.supportStatus){
            supply1 = Math.floor(Math.random() * 20) + 1;
            supply2 = Math.floor(Math.random() * 20) + 1;
            var supplyLocation = supply1 + ',' + supply2;

            military1 = Math.floor(Math.random() * 15) + 1;
            military2 = Math.floor(Math.random() * 15) + 1;
            military3 = Math.floor(Math.random() * 15) + 1;
            var militaryLocation = military1 + ',' + military2 + ',' + military3;

            negotiator1 = Math.floor(Math.random() * 25) + 1;
            negotiator2 = Math.floor(Math.random() * 25) + 1;
            negotiator3 = Math.floor(Math.random() * 25) + 1;
            var negotiatorLocation = negotiator1 + ',' + negotiator2 + ',' + negotiator3;

            this.setState({
                supplyloc: supplyLocation,
                militaryloc: militaryLocation,
                negotiatorloc: negotiatorLocation
            });
          }

          this.setState({
            supportStatus : true,
            status:'attack'
          });

          //insert AI post!

          var newEvent = {
            status: this.state.status,
            eventloc: this.state.eventloc,
            supplyloc: this.state.supplyloc,
            militaryloc: this.state.militaryloc,
            negotiatorloc: this.state.negotiator,
          };
          var serverLocation = "http://localhost:4000/ai/";
            axios.post(serverLocation, newEvent)
              .then(res => console.log(res.data));

          // generate attack location
          // generate supply, military, and negotiator locations
          // push to db to pull
        }
      }
    }

    aiList() {
      return this.state.messages.map(function(data) {
        return (
          <div key={data._id}>
          {data.status ? <p>Status: {data.status} </p> : null}

          {data.eventloc ? <p>There's a {data.status} at {data.eventloc} </p> : null}

          {data.supplyloc ? <p>Supply ships {data.supplyloc} miles away,</p>  : null}

          {data.militaryloc ? <p style={{display: "inline"}}> Military ships {data.militaryloc} miles away,</p>  : null}

          {data.negotiatorloc ? <p style={{display: "inline"}}> Negotiators {data.negotiatorloc} miles away</p>  : null}

        </div>
      );
    })
    }

    messageInit() {
      if (this.state.initial){

          console.log('yay')
        this.initLoad();
        this.setState({
          initial: false
        });
      }
    }

    initLoad() {

      // insert AI get

      var serverLocation = Server + 'ai/'
      axios.get(serverLocation)
        .then(res => {
          this.setState({ messages: res.data });
        })
        .catch(function (error){
          console.log(error);
        });
      //
      // serverLocation = Server + 'requests/'
      // axios.get(serverLocation)
      //   .then(res => {
      //     this.setState({ requests: res.data });
      //   })
      //   .catch(function (error){
      //     console.log(error);
      //   });
    }

    render(){
      return (
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-body" >
                    <div className='col'>
                      <div className="card-title">AI Feed</div>
                    </div>
                    <hr/>
                    {this.messageInit()}
                    <div className="messages" >
                    <div className="row">
                      <div className="col" style={{overflow: "auto", height: "200px"}}>
                      {this.aiList()}
                    </div>

                    {this.aiLoad()}
                    </div>
                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Ai;
