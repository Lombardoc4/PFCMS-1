import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './map.css';


class Square extends React.Component {
  render() {
    let className = 'square';
    if (this.props.value == 'M') {
      className = "square-military";
    }
    if (this.props.value == 'C') {
      className = "square-commercial";
    }
    if (this.props.value == 'U') {
      className = "square-threat";
    }
  return (
    <button
      className={className}
    >
      {this.props.value}
    </button>
  );
}
  }


export default class Board extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        squares: Array(105).fill(null),
        shipID: Array(5).fill(null),
        shipLocal: Array(5).fill(null),
        shipLocalOld: Array(5).fill(null),
        initial: true,
        status: Array(5).fill(null),

      };
    }
    componentDidMount() {
      this.timerID = setInterval(
        () => this.refresh(),
        3000
      );
    }

    componentWillUnmount() {
      clearInterval(this.timerID);
    }
    refresh() {

      var shipID = this.state.shipID.slice();
      var shipLocal = this.state.shipLocal.slice();
      var shipCoor;
      var shipStatus = this.state.status.slice();

      // initial state
      if (this.state.initial) {
        for (var i = 0; i < 5; i ++) {
          shipCoor = Math.floor(Math.random() * 105);
          if (shipLocal[i-1] == shipCoor) {
            shipCoor = Math.floor(Math.random() * 105);
          }
          if (i < 2) {

            shipID[i] = 'C'; //commercial
            shipLocal[i] = shipCoor;
            shipStatus[i] = 'good';
          }
          if (i == 2) {
            shipID[i] = 'M'; //military
            shipLocal[i] = shipCoor;
            shipStatus[i] = 'good';
          }
          if (i > 2) {
            shipID[i] = 'U'; //unknown
            shipLocal[i] = shipCoor;
            shipStatus[i] = 'good';

          }
        }
        this.setState({
          shipID: shipID,
          shipLocal :shipLocal,
          status: shipStatus,
          initial: false
        });
        return;
      }

      //movement
      if (!this.state.inital){
        for (var i = 0; i < 5; i ++){
            // shipLocal = this.state.shipLocal.slice();

          var currentShip = shipLocal[i];
          var legalMoves = legalMove(currentShip, shipLocal, shipID);
          if (shipStatus[i] == 'good'){


          // function status(i) {
          //   for(var j = 0; j < 5; j++){
          //     if (shipLocal[i] == shipLocal[j]){
          //       return new move
          //     }
          //   }
          // }

          if (legalMoves == 0){
          var move = Math.floor(Math.random() * 4) + 1;

            if (move == 1) {
              shipLocal[i] = currentShip - 1; //left
            }
            if (move == 2) {
              shipLocal[i] = currentShip + 1 ; // right
            }
            if (move == 3) {
              shipLocal[i] = currentShip - 15; // up
            }
            if (move == 4) {
              shipLocal[i] = currentShip + 15; // down
            }
            shipStatus[i] = 'good';

          }
          // if (legalMove == -3){
          //   this.state.status[i] = 'threat';
          // }
          if (legalMoves == -5){
            shipStatus[i] = 'attack';
          };
          console.log(legalMoves);
          if (legalMoves != 0){
            shipLocal[i] = currentShip + legalMoves;
            shipStatus[i]=  'good';
          }
          if (legalMoves != 0){
            shipLocal[i] = currentShip + legalMoves;
            shipStatus[i]=  'good';
          }
          }
        }
        console.log(shipLocal);
        this.setState({
          status : shipStatus,
          shipLocal :shipLocal,
        });
      }
    }

    renderSquare(i) {
      const shipLocal = this.state.shipLocal.slice();
      for (var j = 0; j < 5; j++) {
        if (shipLocal[j] === i ) {
        return (
          <Square
          value={this.state.shipID[j]}
          />
        )
      }
    }
    return (
        <Square
          value={this.state.squares[i]}
        />
      );
    }


  render() {

    return (
      <div>
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
          {this.renderSquare(9)}
          {this.renderSquare(10)}
          {this.renderSquare(11)}
          {this.renderSquare(12)}
          {this.renderSquare(13)}
          {this.renderSquare(14)}
        </div>
        <div className="board-row">
          {this.renderSquare(15)}
          {this.renderSquare(16)}
          {this.renderSquare(17)}
          {this.renderSquare(18)}
          {this.renderSquare(19)}
          {this.renderSquare(20)}
          {this.renderSquare(21)}
          {this.renderSquare(22)}
          {this.renderSquare(23)}
          {this.renderSquare(24)}
          {this.renderSquare(25)}
          {this.renderSquare(26)}
          {this.renderSquare(27)}
          {this.renderSquare(28)}
          {this.renderSquare(29)}
        </div>
        <div className="board-row">

          {this.renderSquare(30)}
          {this.renderSquare(31)}
          {this.renderSquare(32)}
          {this.renderSquare(33)}
          {this.renderSquare(34)}
          {this.renderSquare(35)}
          {this.renderSquare(36)}
          {this.renderSquare(37)}
          {this.renderSquare(38)}
          {this.renderSquare(39)}
          {this.renderSquare(40)}
          {this.renderSquare(41)}
          {this.renderSquare(42)}
          {this.renderSquare(43)}
          {this.renderSquare(44)}
        </div>
        <div className="board-row">
          {this.renderSquare(45)}
          {this.renderSquare(46)}
          {this.renderSquare(47)}
          {this.renderSquare(48)}
          {this.renderSquare(49)}
          {this.renderSquare(50)}
          {this.renderSquare(51)}
          {this.renderSquare(52)}
          {this.renderSquare(53)}
          {this.renderSquare(54)}
          {this.renderSquare(55)}
          {this.renderSquare(56)}
          {this.renderSquare(57)}
          {this.renderSquare(58)}
          {this.renderSquare(59)}
        </div>
        <div className="board-row">
          {this.renderSquare(60)}
          {this.renderSquare(61)}
          {this.renderSquare(62)}
          {this.renderSquare(63)}
          {this.renderSquare(64)}
          {this.renderSquare(65)}
          {this.renderSquare(66)}
          {this.renderSquare(67)}
          {this.renderSquare(68)}
          {this.renderSquare(69)}
          {this.renderSquare(70)}
          {this.renderSquare(71)}
          {this.renderSquare(72)}
          {this.renderSquare(73)}
          {this.renderSquare(74)}
        </div>
        <div className="board-row">
          {this.renderSquare(75)}
          {this.renderSquare(76)}
          {this.renderSquare(77)}
          {this.renderSquare(78)}
          {this.renderSquare(79)}
          {this.renderSquare(80)}
          {this.renderSquare(81)}
          {this.renderSquare(82)}
          {this.renderSquare(83)}
          {this.renderSquare(84)}
          {this.renderSquare(85)}
          {this.renderSquare(86)}
          {this.renderSquare(87)}
          {this.renderSquare(88)}
          {this.renderSquare(89)}
        </div>
        <div className="board-row">
          {this.renderSquare(90)}
          {this.renderSquare(91)}
          {this.renderSquare(92)}
          {this.renderSquare(93)}
          {this.renderSquare(94)}
          {this.renderSquare(95)}
          {this.renderSquare(96)}
          {this.renderSquare(97)}
          {this.renderSquare(98)}
          {this.renderSquare(99)}
          {this.renderSquare(100)}
          {this.renderSquare(101)}
          {this.renderSquare(102)}
          {this.renderSquare(103)}
          {this.renderSquare(104)}
        </div>

      </div>
      </div>
    );
  }
}

// class Game extends React.Component {
//   render() {
//     return (
//       <div className="game">
//         <div className="game-board">
//           <Board />
//         </div>
//         <div className="game-info">
//           <div>{/* status */}</div>
//           <ol>{/* TODO */}</ol>
//         </div>
//       </div>
//     );
//   }
// }

// ReactDOM.render(
//   <Game />,
//   document.getElementById('root')
// );

function legalMove(i, otherShipLocal, otherShipID) {
  var upperLimit = [1,2,3,4,5,6,7,8,9,10,11,12,13]
  var leftLimit = [15,30,45,60,75]
  var rightLimit = [29,44,59,74,89]
  var bottomLimit = [91,92,93,94,95,96,97,98,99,100,101,102,103]

  // check for attack
    for (j = 0; j < 5; j++) {
      if (j != i) {
        if (otherShipLocal[j] == i - 15 ||otherShipLocal[j] == i + 15 || otherShipLocal[j] == i - 1 || otherShipLocal[j] == i + 1 ||otherShipLocal[j] == i + 16 || otherShipLocal[j] == i + 14 || otherShipLocal[j] == i - 16 ||otherShipLocal[j] == i - 14){
          console.log("Neighbors " + otherShipLocal[j]);
          if(otherShipID[j] == 'U' && otherShipID[i] == 'C' || otherShipID[j] == 'C' && otherShipID[i] == 'U'){
            console.log("Attack" + otherShipLocal[j]);
            var stationary = -5;
            return stationary;
          }
        }
      }
    }

    var move = Math.floor(Math.random() * 3)+ 1
    if (i == 0) {
      if (move == 1 || move == 3){
        move = 15
      }
      if (move == 2) {
        move = 1
      }
      return move;
    }
    if (i == 14) {
      if (move == 1 || move == 3){
        move = 15
      }
      if (move == 2) {
        move = 0 - 1
      }
      return move;
    }
    if (i == 90) {
      if (move == 1 || move == 3){
        move = 0 - 15
      }
      if (move == 2) {
        move = 1
      }
      return move;
    }
    if (i == 104) {
      if (move == 1 || move == 3){
        move = 0 - 15
      }
      if (move == 2) {
        move = 0 - 1
      }
      return move;
    }
  for (var j = 0; j < 15; j++)
  {
    if (i == bottomLimit[j])
    {
      if (move == 1) {
        move = 0 - 1; //left
      }
      if (move == 2) {
        move = 1 ; // right
      }
      if (move == 3) {
        move = 0 - 15; // up
      }
      return move
    }

    if (i == upperLimit[j])
    {
      if (move == 1) {
        move = 0 - 1; //left
      }
      if (move == 2) {
        move = 1 ; // right
      }
      if (move == 3) {
        move = 15; // down
      }
      return move;
    }

    if (i == leftLimit[j])
    {
      if (move == 1) {
        move = 15; // down
      }
      if (move == 2) {
        move = 1 ; // right
      }
      if (move == 3) {
        move = 0 - 15; // up
      }
      return move;
    }

    if (i == rightLimit[j])
    {
      if (move == 1) {
        move =  15; // down
      }
      if (move == 2) {
        move = 1 ; // right
      }
      if (move == 3) {
        move = 0 - 15; // up
      }
      return move;
    }
  }
  return 0;
}
