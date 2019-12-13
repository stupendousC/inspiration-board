import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './Board.css';
import Card from './Card';
import NewCardForm from './NewCardForm';
import CARD_DATA from '../data/card-data.json';

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      boardURL: this.props.url + this.props.boardName,
      error: "",
      cards: [],
    };
  }

  componentDidMount() {
    // console.log("<Board> mounted");

    axios.get(this.state.boardURL + "/cardsxxx")
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      this.setState({ error: `Oh hell no!  ${error.message}`});
    })
  }


  render() {
    return (
      <div>
        { this.state.error ? <h1>{this.state.error}</h1>: null}
        
        Board
      </div>
    )
  }

}

Board.propTypes = {
  url: PropTypes.string.isRequired,
  boardName: PropTypes.string.isRequired,
};

export default Board;
