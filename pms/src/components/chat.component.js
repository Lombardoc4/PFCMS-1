import React from "react";
import io from "socket.io-client";
import axios from 'axios';

const Server = "http://localhost:4000/";



class Chat extends React.Component{

  // IMPORT USERNAME VALUE AND MODIFY VISUALLY
    constructor(props){
        super(props);
        this.messageInit = this.messageInit.bind(this);
        this.initLoad = this.initLoad.bind(this);
        this.state = {
            username: this.props.user,
            message: '',
            messages: [],
            requests:[],
            initial: true
        };

        console.log(this.props.user);
        this.socket = io('localhost:4000');

        this.socket.on('RECEIVE_MESSAGE', function(data){

            addMessage(data);
            // var serverLocation = Server + 'chat/';
            // axios.get(serverLocation)
            //   .then(res => {
            //     this.setState({ messages: res.data });
            //   })
            //   .catch(function (error){
            //     console.log(error);
            //   });
        });

        const addMessage = data => {
            // console.log(data);
            // this.setState({messages: [...this.state.messages, data]});
            var serverLocation = Server + 'chat/';
            axios.get(serverLocation)
              .then(res => {
                this.setState({ messages: res.data });
              })
              .catch(function (error){
                console.log(error);
              });

          }
            // console.log(this.state.messages);

        this.sendMessage = ev => {
            ev.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                author: this.state.username,
                message: this.state.message
            })
            var newChat = {
              author: this.state.username,
              message: this.state.message
            };
            var serverLocation = "http://localhost:4000/chat";
              axios.post(serverLocation, newChat)
                .then(
                  axios.get(serverLocation)
                    .then(res => {
                      this.setState({ messages: res.data });
                    })
                    .catch(function (error){
                      console.log(error);
                    })
                  )

            this.setState({message: ''});
        }
    }

    componentDidMount() {
      this.timerID = setInterval(
        () => this.initLoad(),
        30000
      );
    }

    componentWillUnmount() {
      clearInterval(this.timerID);
    }

    requestList() {
      return this.state.requests.map(function(request) {
        // console.log({request.medkits})
        return (
          <div style={{color: "red"}} key={request._id}>
          {request.medkits != 0 ? <p>{request.medkits} medical kits,</p>  : null}
          {request.food != 0 ? <p style={{display: "inline"}}
    > {request.food} servings of food,</p>  : null}
          {request.heli ? <p style={{display: "inline"}}> Helicopter support,</p>  : null}
          {request.vessels ? <p style={{display: "inline"}}> Vessel support,</p>  : null}
          {request.jet != 0 ? <p style={{display: "inline"}}> Jet support</p>  : null}
          {request.negotiator != null ? <p style={{display: "inline"}}>Negotiator that speaks {request.negotiator}</p>  : null}


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
      var serverLocation = Server + 'chat/'
      axios.get(serverLocation)
        .then(res => {
          this.setState({ messages: res.data });
        })
        .catch(function (error){
          console.log(error);
        });

      serverLocation = Server + 'requests/'
      axios.get(serverLocation)
        .then(res => {
          this.setState({ requests: res.data });
        })
        .catch(function (error){
          console.log(error);
        });
    }

    render(){
      return (
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-body" >
                    <div className="row">
                    <div className='col'>
                      <div className="card-title">Global Chat</div>
                    </div>
                    <div className='col'>
                      <div className="card-title:" style={{color: "red"}}>Requests</div>
                    </div>
                    </div>

                    <hr/>
                    {this.messageInit()}
                    <div className="messages" >
                    <div className="row">
                      <div className="col" style={{overflow: "auto", height: "200px"}}>
                      {this.state.messages.map(message => {
                        return (
                          <div key={message._id}>{message.author}: {message.message}</div>
                          )
                      })}
                    </div>

                    <div className="col" style={{overflow: "auto", height: "200px"}}>

                    {this.requestList()}
                    </div>
                    </div>

                    </div>
                    <div className="card-footer">

                    <br/>
                    <input type="text" placeholder="Message" className="form-control" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}/>
                                <br/>
                                <button onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;
