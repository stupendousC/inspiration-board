import React, { Component } from 'react';
import './App.css';
import Board from './components/Board';

class App extends Component {
  state = { boardName: "StupendousC" }

  render() {
    return (
      <section>
        <section className="selectBoardsMenu__container">
          <select className="selectBoardsMenu">

          </select>
        </section>
        

        <header className="header">
          <h1 className="header__h1"><span className="header__text">Inspiration Board</span></h1>
          <h1 className="header__h1"><span className="header__text boardName">{this.state.boardName}</span></h1>\
        </header>

        <Board
          baseUrl="https://inspiration-board.herokuapp.com"
          url="https://inspiration-board.herokuapp.com/boards/"
          boardName={this.state.boardName}
          />

      </section>
    );
  }
}

export default App;
