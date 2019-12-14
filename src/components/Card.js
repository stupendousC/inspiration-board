import React, { Component } from 'react';
import PropTypes from 'prop-types';
import emoji from 'emoji-dictionary';

import './Card.css';
import Axios from 'axios';

class Card extends Component {

  deleteCard = (event) => {
    console.log(`TODO: delete this ${event.target.name}`);

    const endpoint = (this.props.baseUrl + "/cards/" + event.target.name);
    console.log(endpoint);
    
    Axios.delete( endpoint )
    .then(response => {
      console.log(response.data);
      
      this.props.deleteCardCallback(event.target.name);

    })
    .catch(error => {
      console.log(error.message);
      
    });
    
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
};

export default Card;
