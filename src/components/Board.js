import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './Board.css';
import Card from './Card';
import NewCardForm from './NewCardForm';
// import CARD_DATA from '../data/card-data.json';    I did NOT use this hard coded .json

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      boardURL: this.props.url + this.props.boardName  + "/cards",
      error: "",
      cards: [],
    };
  }

  componentDidMount() {
    axios.get(this.state.boardURL)
    .then((response) => {
      const allCards = response.data.map( (hash) => {
        return (hash.card);
      });
      this.setState({ cards: allCards });      
    })
    .catch((error) => {
      this.setState({ error: `Oh hell no!  ${error.message}`});
    })
  }

  showCards = () => {
    console.log("generating <Card> components for this.state.cards", this.state.cards);
    return (this.state.cards.map((card, i) => {
      return(<Card key={i} id={card.id} text={card.text} emoji={card.emoji} baseUrl={this.props.baseUrl} deleteCardCallback={this.deleteCard}/>);
    }));
  }

  deleteCard = (id) => {
    console.log(`Board received: Delete triggered in <Card> for id ${id}`);
    // DOESN"T WORK YET!!!!!!!
  }

  addNewCard = (text, emoji) => {
    console.log("TODO!  ADD NEW CARD!", text, "&", emoji);
    const cardObj = {card: { text: {text}, emoji: {emoji} }};

    axios.post(this.state.boardURL, cardObj)
    .then(response => {
      console.log("SUCCESS!", response.data);
      
    })
    .catch(error => {
      this.setState({ error: `Adding new card failed b/c ${error.message}`})
    });
    
  }

  render() {
    return (
      <div>
        { this.state.error ? <h1>{this.state.error}</h1>: null}
        
        <section className="card__container">
          {this.showCards()}
        </section>

        <NewCardForm baseUrl={this.props.baseUrl} newCardCallback={this.addNewCard}/>

      </div>
    )
  }

}

Board.propTypes = {
  url: PropTypes.string.isRequired,
  boardName: PropTypes.string.isRequired,
};

export default Board;
