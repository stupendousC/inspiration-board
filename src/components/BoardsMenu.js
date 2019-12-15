import React from 'react';
import PropTypes from 'prop-types';

class BoardsMenu extends React.Component  {
  constructor(props) {
    super(props);
    this.state ={ currBoard: props.currBoard }
  }
  
  onFieldChange = (event) => {
    console.log(`you chose ${event.target.value}`);
    this.setState({ currBoard: event.target.value });
    
    this.props.switchBoardCallback(event.target.value);
  }

  render() {
    const boardOptions = this.props.allBoards.map((boardName, i) => {
      return (<option key={i} value={boardName}>{boardName}</option>);
    })

    return (
    <select name="newBoard" value={this.state.currBoard} onChange={this.onFieldChange}>
      {boardOptions}
    </select>
    )
  }
  
}

BoardsMenu.propTypes = {
  allBoards: PropTypes.arrayOf(PropTypes.string),
  currBoard: PropTypes.string,
  switchBoardCallback: PropTypes.func.isRequired,
}


export default BoardsMenu;

