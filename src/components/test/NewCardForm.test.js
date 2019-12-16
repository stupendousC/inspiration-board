import React from 'react';
import { render, cleanup } from '@testing-library/react';
import NewCardForm from '../NewCardForm';

describe('NewCardForm', () => {

  test( 'matches existing snapshot', () => {
    // Arrange-Act
    const result = render(
      <NewCardForm baseURL="abc" newCardCallback={()=>{}}/>
    );

    // Assert
    expect(result.asFragment()).toMatchSnapshot();
    cleanup();
  }

  );
})