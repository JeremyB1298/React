import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './style.css';
import Square from './Square';
import Score from './Score';
import ResetButton from './ResetButton';
import ReactLink from './ReactLink'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      squares: [
        [null,null,null],
        [null,null,null],
        [null,null,null]
      ],
      player: true,
      winner: null,
      scoreX: 0,
      scoreO: 0,
      namePlayer1: 'Player1',
      namePlayer2: 'Player2',
      tabPlays: new Array(),
      idTabPlays: 0
    };
  }

  updateBoard(y, x, value, board) {
    return [
      ...board.slice(0, y),
      [
        ...board[y].slice(0, x),
        value,
        ...board[y].slice(x + 1),
      ],
      ...board.slice(y + 1),
    ]
  }

  updateScoreX() {
    var scoreX = 0
    if(this.state.winner == 'X') {
      scoreX++
    }
    return this.state.scoreX + scoreX
  }

    updateScoreO() {
    var scoreO = 0
    if(this.state.winner == 'O') {
      scoreO++
    }
    return this.state.scoreO + scoreO
  }

  play(x,y){
    this.setState(state => {
      let squares = null;
      let player = null;
      let symbolPlayer = null;
      if(this.state.player == true){
      squares = this.updateBoard(x,y,"X",this.state.squares);
      player = !this.state.player;
      symbolPlayer = "X"
      }
      else{
      squares = this.updateBoard(x,y,"O",this.state.squares);
      player = !this.state.player;
      symbolPlayer = "O"
      }  
      return{
        squares: squares,
        winner: this.getWinner(squares),
        player: player, 
        scoreX: this.updateScoreX(),
        scoreO: this.updateScoreO(),
        tabPlays: this.updatePlayToList(x, y, symbolPlayer)
      }
    })
  }

  updatePlayToList(x, y, playerSymbol) {
    let tabPlays = this.state.tabPlays
    tabPlays.push([x, y, playerSymbol])
    this.setState(state => {
      let idTabPlays = this.state.idTabPlays
      idTabPlays++

      return {
        idTabPlays: idTabPlays
      }
    })
    return tabPlays
  }

  handleClick(x, y){ 
    if(this.state.winner == null && this.state.squares[x][y] == null){
      this.play(x, y);
    }
    else{      
    }
    //this.updateScore()
  }

  getWinner(squares){
    
    if(squares[0][0] === squares[0][1] && squares[0][1] === squares[0][2] && squares[0][0] !== null){
      return squares[0][0];
    }
    else if(squares[1][0] === squares[1][1] && squares[1][1] === squares[1][2] && squares[1][0] !== null){
      return squares[1][0];
    }
    else if(squares[2][0] === squares[2][1] && squares[2][1] === squares[2][2] && squares[2][0] !== null){
      return squares[2][0];
    }
    else if(squares[0][0] === squares[1][0] && squares[1][0] === squares[2][0] && squares[0][0] !== null){
      return squares[0][0];
    }
    else if(squares[0][1] === squares[1][1] && squares[1][1] === squares[2][1] && squares[0][1] !== null){
      return squares[0][1];
    }
    else if(squares[0][2] === squares[1][2] && squares[1][2] === squares[2][2] && squares[0][2] !== null){
      return squares[0][2];
    }
    else if(squares[0][0] === squares[1][1] && squares[1][1] === squares[2][2] && squares[0][0] !== null){
      return squares[0][0];
    }
    else if(squares[0][2] === squares[1][1] && squares[1][1] === squares[2][0] && squares[0][2] !== null){
      return squares[0][2];
    }
    else{
      return null;
    }
    
  }

  whichPlayer(){
    if(this.state.winner === null){
      if(this.isEgual() === true){
        return 'Egalité';
      }
      else{
        if(this.state.player){
          let nextPlayer = 'Next player: ' + this.state.namePlayer1
          return nextPlayer
        }
        else{
          let nextPlayer = 'Next player: ' + this.state.namePlayer2
          return nextPlayer
        }
      }
    }
    else{
      if(this.state.player === true){
        let winner = this.state.namePlayer2 + ' est vainqueur'
        return winner;
      }
      else{
        let winner = this.state.namePlayer1 + ' est vainqueur'
        return winner;
      }
    }
  }

  isEgual(){  
    let bool=true;
    this.state.squares.forEach(tab => {
      tab.forEach(element => {
        if(element === null){
          bool = false;
        }
      });
    });
    if(bool === true){
      return true;
    }
    else{
      return false;
    }
  }

  resetGame(scoreX, scoreO) {
    this.setState(state => {
      let squares = [
      [null,null,null],
      [null,null,null],
      [null,null,null]
    ];
    let winner = null
    let tabPlays = new Array()
      return{
        squares: squares,
        winner: winner,
        scoreX: scoreX,
        scoreO: scoreO,
        tabPlays: tabPlays,
        idTabPlays: 0
      }
    })
    //this.updateScore()
  }

  submitPlayerName(){
    alert('A name was submitted: ' + this.state.namePlayer1);
  }

  handleChangeName1(event) {
    event.persist()
    this.setState(state => {
      let namePlayer1 = "Player1"
      if(event.target.value != null){
         namePlayer1 = event.target.value
      }
      return{
        namePlayer1: namePlayer1
      }
    })
  }

  // updateScore(){
  //   this.setState(state => {
  //     var scoreX = 0
  //     var scoreO = 0
  //     if(this.state.winner == 'X') {
  //       scoreX++
  //     } else if(this.state.winner == 'O') {
  //       scoreO++
  //     }
  //     return{
  //       scoreX: this.state.scoreX + scoreX,
  //       scoreO: this.state.scoreO + scoreO
  //     }
  //   })
  // }

  handleChangeName2(event) {
    event.persist()
    this.setState(state => {
      let namePlayer2 = "Player2"
      if(event.target.value != null){
         namePlayer2 = event.target.value
      }
      return{
        namePlayer2: namePlayer2
      }
    })
  }

  undoPlays() {
    // for (var i = 0; i < this.state.tabPlays.length; i++) {
    //   console.log(this.state.tabPlays[i])
    // }
    if (this.state.tabPlays[0] != null && this.state.winner === null) {
      this.setState(state => {
      let tabPlays = this.state.tabPlays
      let squares = null;
      let player = null;
      let idTabPlays = this.state.idTabPlays
      squares = this.updateBoard(tabPlays[idTabPlays-1][0],tabPlays[idTabPlays-1][1],null,this.state.squares);
      player = !this.state.player;
      idTabPlays--
      return{
        squares: squares,
        player: player,
        tabPlays: tabPlays,
        idTabPlays: idTabPlays
      }
    })
    }
  }

  redoPlays() {
    if (this.state.tabPlays[this.state.idTabPlays] != null && this.state.winner === null) {
      this.setState(state => {
      let tabPlays = this.state.tabPlays
      let squares = null;
      let player = null;
      let idTabPlays = this.state.idTabPlays
      console.log(tabPlays[idTabPlays])
      squares = this.updateBoard(tabPlays[idTabPlays][0],tabPlays[idTabPlays][1],tabPlays[idTabPlays][2],this.state.squares);
      player = !this.state.player;
      idTabPlays++
      return{
        squares: squares,
        player: player,
        tabPlays: tabPlays,
        idTabPlays: idTabPlays
      }
    })
    }
  }

  render() {
    const status = this.whichPlayer();
    const scoreX = this.updateScoreX();
    const scoreO = this.updateScoreO();
    return (
      <div className="nameBloc" >
      <div>
      <div className="status">{status}</div><br></br>
        <form >
          <label>
            Name Player X:
            <input class="" type="text" value={this.state.namePlayer1} onChange={e => this.handleChangeName1(e)}/>
          </label>
          <label>
            Name Player O:
            <input type="text" value={this.state.namePlayer2} onChange={e => this.handleChangeName2(e)}/>
          </label>
        </form>
      </div>
      <br></br><br></br>
      <div > <button class="optionsButton" onClick={() => this.undoPlays()} > undo</button> 
       <button onClick={() => this.redoPlays()} > redo</button> </div>
       <br></br>
      <div className="board-row">
        <Square 
        value={this.state.squares[0][ 0]} 
        onClick={() => this.handleClick(0, 0)}
      />
        <Square 
        value={this.state.squares[0][ 1]} 
        onClick={() => this.handleClick(0, 1)}
      />
        <Square 
        value={this.state.squares[0][ 2]} 
        onClick={() => this.handleClick(0, 2)}
      />
      </div>
      <div className="board-row">
        <Square 
        value={this.state.squares[1][ 0]} 
        onClick={() => this.handleClick(1, 0)}
      />
        <Square 
        value={this.state.squares[1][ 1]} 
        onClick={() => this.handleClick(1, 1)}
      />
        <Square 
        value={this.state.squares[1][ 2]} 
        onClick={() => this.handleClick(1, 2)}
      />
      </div>
      <div className="board-row">
        <Square 
        value={this.state.squares[2][ 0]} 
        onClick={() => this.handleClick(2, 0)}
      />
        <Square 
        value={this.state.squares[2][ 1]} 
        onClick={() => this.handleClick(2, 1)}
      />
        <Square 
        value={this.state.squares[2][ 2]} 
        onClick={() => this.handleClick(2, 2)}
      />
      </div>
      <div className="score" > Score de {this.state.namePlayer1} : <Score value={scoreX} /> 
      Score de {this.state.namePlayer2} : <Score value={scoreO} /></div>
      <div> <ResetButton onClick={() => this.resetGame(scoreX, scoreO)} /> </div>
    </div>

    );
  }
}

export default App;
