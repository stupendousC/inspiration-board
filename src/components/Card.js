import React, { Component } from 'react';
import PropTypes from 'prop-types';
import emoji from 'emoji-dictionary';

import './Card.css';

class Card extends Component {

  deleteCard = () => {
    console.log(`TODO: delete this card`);
    
  }

  render() {
    

    return (
      <div className="card__container">
        <section className="card card__content">
          <p className="card__content-text">{this.props.text}</p>
          <p className="card__content-emoji">{this.props.emoji ? emoji.getUnicode(this.props.emoji):null}</p>
          <input type="button" value="DELETE" onClick={this.deleteCard} className="card__delete"></input>
        </section>
      </div>
    )
  }
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string,
  emoji: PropTypes.string,
};

export default Card;
