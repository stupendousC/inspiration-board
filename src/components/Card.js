import React, { Component } from 'react';
import PropTypes from 'prop-types';
import emoji from 'emoji-dictionary';
import './Card.css';

class Card extends Component {

  deleteCard = (event) => {
    // console.log(`Delete this id: ${event.target.name}`);
    this.props.deleteCardCallback(event.target.name);    
  }

  render() {

    return (
        <section className="card card__content">
          <p className="card__content-text">{this.props.text}</p>
          <p className="card__content-emoji">{this.props.emoji ? emoji.getUnicode(this.props.emoji):null}</p>
          <input type="button" name={this.props.id} value="DELETE" onClick={this.deleteCard} className="card__delete"></input>
        </section>
    )
  }
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string,
  emoji: PropTypes.string,
  baseURL: PropTypes.string,
  deleteCardCallback: PropTypes.func.isRequired,
};

export default Card;
