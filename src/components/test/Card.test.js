import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Card from '../Card';
import emoji from 'emoji-dictionary';

describe('Card', () => {

  test( 'will render with correct attribs', () => {
    // Arrange-Act
    const result = render(
      <Card id={123} text="super cool" emoji="cat" deleteCardCallback={()=>{}}/>
    );

    // Assert
    const emojiPic = emoji.getUnicode("cat");
    console.log(emojiPic);   
    //I copied & pasted the emojiPic into line below
    
    expect(result.getByText(/🐱/)).toBeDefined();
    expect(result.getByText(/super cool/)).toBeDefined();
  });

  test( 'clicking Delete actually does trigger deleteCardCallback', () => {
    // Arrange
    // create a mock callback fcn
    const mockDelete = jest.fn();

    //render a card
    const card = render(
      <Card id={456} text="poop!" emoji="dog" deleteCardCallback={mockDelete}/>
    );

    // Act
    // find the delete button & trigger it
    const deleteButton = card.getByText(/DELETE/);
    deleteButton.click();

    // Assert
    expect(mockDelete).toHaveBeenCalled();
  });

});