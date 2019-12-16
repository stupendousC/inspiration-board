import React from 'react';
import { render, cleanup } from '@testing-library/react';
import NewCardForm from '../NewCardForm';

describe('NewCardForm', () => {

  test( 'matches existing snapshot', () => {
    // Arrange-Act
    const result = render(
      <NewCardForm baseURL="https://inspiration-board.herokuapp.com" newCardCallback={()=>{}}/>
    );

    // Assert
    expect(result.asFragment()).toMatchSnapshot();
    cleanup();
  });

  test( 'clicking Submit actually does trigger newCardCallback', () => {
    // Arrange
    // create a mock callback fcn
    const mockNewCardCallback = jest.fn();

    //render a NewCardForm
    const container = render(
      <NewCardForm baseURL="baseURL here" newCardCallback={mockNewCardCallback}/>
    );

    // Act
    // find the add new button & trigger it
    const addNewCardButton = container.getByTestId('submit');
    addNewCardButton.click();

    // Assert
    expect(mockNewCardCallback).toHaveBeenCalled();
  });


})