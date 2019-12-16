import React, { Component } from 'react';
import './App.css';
import Board from './components/Board';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = { 
      baseURL: "https://inspiration-board.herokuapp.com",
      boardURL: "https://inspiration-board.herokuapp.com/boards/",
      boardName: "StupendousC", 
      allBoards: [],
      boardOptions: [],
    }

  }

  componentDidMount() {
    // get all the boards from the API
    axios.get(this.state.boardURL)
    .then((response) => {
      const allBoards = response.data.map( (entry) => {
        return (entry.board.name);
      });
      
      const boardOptions = allBoards.map((boardName, i) => {
        return (<option key={i} value={boardName}>{boardName}</option>);
      });

      this.setState({ allBoards, boardOptions });
    })
    .catch((error) => {
      this.setState({ boardOptions: [<option>{`ERROR: ${error.message}`}</option>]})
    })
  }
  
  onSelectNewBoard = (event) => {
    this.setState({ boardName: event.target.value });
  }

  render() {
    return (
      <section>

        <section className="selectBoardsMenu__container">
          <select name="newBoard" value={this.state.boardName} onChange={this.onSelectNewBoard} className="selectBoardsMenu">
            {this.state.boardOptions}
          </select>
        </section>
        
        <header className="header">
          <h1 className="header__h1"><span className="header__text">Inspiration Board</span></h1>
          <h1 className="header__h1"><span className="header__text boardName">{this.state.boardName}</span></h1>\
        </header>

        <Board
          baseURL={this.state.baseURL}
          URL={this.state.boardURL}
          boardName={this.state.boardName}
        />

      </section>
    );
  }
}

export default App;
