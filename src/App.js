import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
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
      namePlayer1: 'Player1'
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

  play(x,y){
    this.setState(state => {
      let squares = null;
      let player = null;
      if(this.state.player == true){
      squares = this.updateBoard(x,y,"X",this.state.squares);
      player = !this.state.player;
      }
      else{
      squares = this.updateBoard(x,y,"O",this.state.squares);
      player = !this.state.player;
      }
  
      return{
        squares: squares,
        player: player,
        winner: this.getWinner(squares)
      }
    })
  }

 

  handleClick(x, y){ 
    if(this.state.winner == null && this.state.squares[x][y] == null){
      this.play(x, y);
    }
    else{      
      console.log("fin");
    }
  }

  getWinner(squares){
    
    if(squares[0][0] === squares[0][1] && squares[0][1] === squares[0][2] && squares[0][0] !== null){
      return squares[0][0];
    }
    else if(squares[1][0] === squares[1][1] && squares[1][1] === squares[1][2] && squares[1][0] !== null){
      return squares[1][0];
    }
    else if(squares[2][0] === squares[2][1] && squares[2][1] === squares[2][2] && squares[2][0] !== null){
      console.log("CACAO");
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
        return 'Next player: X'
        }
        else{
          return 'Next player: O'
        }
      }
    }
    else{
      if(this.state.player === true){
        return 'O est vainqueur';
      }
      else{
        return 'X est vainqueur';
      }
    }
  }

  isEgual(){  
    let bool=true;
    this.state.squares.forEach(tab => {
      console.log(tab);
      tab.forEach(element => {
        console.log(element);
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

  ressetGame(){



  }
  submitPlayerName(){
    alert('A name was submitted: ' + this.state.namePlayer1);
  }
  handleChange(event) {
    //this.setState({namePlayer1: event.target.value});
    this.setState(state => {
      let namePlayer1 = event.target.value;
      return{
        namePlayer1: namePlayer1
      }
    })
  }
  render() {
    const status = this.whichPlayer();
    return (
      <div>
      <div className="status">{status}</div>
      <div>
        <form onSubmit={this.submitPlayerName}>
          <label>
            Name Player X:
            <input type="text" value={this.state.namePlayer1} onChange={this.handleChange}/>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
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
      <div>Score de X : <Score value={this.state.scoreX} /> </div>
      <div>Score de O : <Score value={this.state.scoreO} /></div>
      <div> <ResetButton onClick={() => this.ressetGame()} /> </div>
    </div>

    );
  }
}

export default App;
