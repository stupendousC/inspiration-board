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
      currBoard: this.props.boardName,
      // boardURL: this.props.boardsURL + this.props.boardName  + "/cards",
      error: "",
      cards: [],
    };
  }

  getAndSaveAllCards = (endpointURL) => {
    axios.get(endpointURL)
    .then((response) => {
      const allCards = response.data.map( (hash) => {
        return (hash.card);
      });
      this.setState({ cards: allCards, currBoard: this.props.newBoardName });
    })
    .catch((error) => {
      this.setState({ error: `Oh hell no!  ${error.message}`});
      return null;
    })
  }

  componentDidMount() {
    const origBoardURL = this.props.boardsURL + this.props.boardName + "/cards";
    this.getAndSaveAllCards(origBoardURL);
  }

  componentDidUpdate() {
    console.log(`componentDidUPDATE`);
    if (this.props.newBoardName !== this.props.boardName) {
      console.log(`\n\n\n\n\n\nBOARD = ${this.props.boardName}`);
      const updatedBoardURL = this.props.boardsURL + this.props.newBoardName + "/cards";
      // this.getAndSaveAllCards(updatedBoardURL);
    };
  }

  showCards = () => {
    // console.log(`showCards()`);
    
    

    console.log("generating <Card> components for", this.props.newBoardName);
    return (this.state.cards.map((card, i) => {
      return(<Card key={i} id={card.id} text={card.text} emoji={card.emoji} baseURL={this.props.baseURL} deleteCardCallback={this.deleteCard}/>);
    }));
  }

  deleteCard = (id) => {
    // console.log(`Board received: Delete triggered in <Card> for id ${id}`);
    const endpoint = (this.props.baseURL + "/cards/" + id); 
    
    axios.delete( endpoint )
    .then((response) => {
      // Option A: instead of sending another API to get any other new cards, I just deleted the one from state
      // let updatedCards = [...this.state.cards].filter(card => {
      //   return card.id !== parseInt(id);
      // })
      // this.setState({ cards: updatedCards, error: "" });

      // Option B: if I wanted to get the latest info: both excluding the one I deleted AND getting any new cards... 
      this.getAndSaveAllCards(this.state.boardsURL);
    })
    .catch(error => {
      this.setState({ error: `Card deletion failed: ${error.message}`});
    });

  }

  addNewCard = (text, emoji) => {
    // console.log("ADD NEW CARD with params: text=", text, "& emoji=", emoji);

    axios.post(this.state.boardsURL + `?text=${text}&emoji=${emoji}`)
    .then(response => {
      const updatedCards = [...this.state.cards];
      updatedCards.unshift(response.data.card);
      this.setState({ cards: updatedCards });
    })
    .catch(error => {
      this.setState({ error: `Adding new card failed b/c ${error.message}.`})
    });
    
  }

  render() {
    const allCards = this.showCards();

    return (
      <div>
        { this.state.error ? <h1>{this.state.error}</h1>: null}
        
        <section className="cards__container">
          {allCards}
        </section>

        <NewCardForm baseURL={this.props.baseURL} newCardCallback={this.addNewCard}/>

      </div>
    )
  }

}

Board.propTypes = {
  boardsURL: PropTypes.string.isRequired,
  boardName: PropTypes.string.isRequired,
};

export default Board;
