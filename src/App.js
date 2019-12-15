import React, { Component } from 'react';
import './App.css';
import Board from './components/Board';
import axios from 'axios';
import BoardsMenu from './components/BoardsMenu';

class App extends Component {
  constructor() {
    super();
    this.state = {
      baseURL: "https://inspiration-board.herokuapp.com",
      allBoardsURL: "https://inspiration-board.herokuapp.com/boards/",
      boardName: "StupendousC",
      allBoards: [],
    }
  }

  componentDidMount() {
    // get all existing boards from API, save to state.allBoards
    axios.get(this.state.allBoardsURL)
    .then(response => {
      const allBoards = response.data.map(entry => {
        return entry.board.name;
      });
      this.setState({ allBoards });
    })
    .catch(error => {
      console.log(`error loading all board names from API: ${error.message}`);
      this.setState({ allBoards: [error.message]});
    });
  }

  switchToDiffBoard = (newBoardName) => {
    console.log(`APP WILL SWITCH TO NEW BOARD: ${newBoardName}`);
    this.setState({ boardName: newBoardName });
  }

  render() {
    return (
      <section>

        <section className="switchBoard__selectMenu">
          <BoardsMenu allBoards={this.state.allBoards} currBoard={this.state.boardName} switchBoardCallback={this.switchToDiffBoard}/>
        </section>

        <header className="header">
          <h1 className="header__h1"><span className="header__text">Inspiration Board</span></h1>
          <h1 className="header__h1"><span className="header__text boardName">{this.state.boardName}</span></h1>\
        </header>

        <Board
          baseURL={this.state.baseURL}
          URL={this.state.allBoardsURL}
          boardName={this.state.boardName}
          />

      </section>
    );
  }
}

export default App;
