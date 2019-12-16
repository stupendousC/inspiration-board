import React, { Component } from 'react';
import PropTypes from 'prop-types';
import emoji from 'emoji-dictionary';
import emojiNames from 'emoji-names';
import './NewCardForm.css';
// import { thisExpression } from '@babel/types';   IDK what this is, but it's not being used...

// const EMOJI_LIST = ["", "heart_eyes", "beer", "clap", "sparkling_heart", "heart_eyes_cat", "dog"]
const EMOJI_LIST = ["", ...emojiNames];

export default class NewCardForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      emoji: "",
      text: "",
    }
  }

  genSelectMenu = () => {
    const emojiOptions = EMOJI_LIST.map((emojiStr, i) => {
      return (<option value={emojiStr} key={i}>{emoji.getUnicode(emojiStr)}</option>);
    });

    return (
      <select name="emoji" value={this.state.emoji} onChange={this.onFieldChange} className="new-card-form__form-select">
        {emojiOptions}
      </select>
    )
  }

  onFieldChange = (event) => {    
    this.setState({ [event.target.name]: event.target.value });
  }

  onFormSubmit = (event) => {
    event.preventDefault();

    const { text, emoji } = this.state;
    this.props.newCardCallback(text, emoji);

    this.setState({ emoji: "", text: "" })
  }

  render() {
    return (
      <section className="new-card-form">
        <h1 className="new-card-form__header">Add a New Card!</h1>
        
        <form onSubmit={this.onFormSubmit} className="new-card-form__form">
          <h3 className="new-card-form__form-label">Message:</h3>
          <textarea value={this.state.text} onChange={this.onFieldChange} name="text" type="text" className="new-card-form__form-textarea" />
          
          <h3 className="new-card-form__form-label">Emoji:</h3>
          {this.genSelectMenu()}

          <input type="submit" data-testid="submit" className="new-card-form__form-button"/>
        </form>

      </section>
    );
  }
}

NewCardForm.propTypes = {
  baseURL: PropTypes.string.isRequired,
  newCardCallback: PropTypes.func.isRequired,
}