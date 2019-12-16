import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Card from '../Card';

describe('Card', () => {

  test( 'matches existing snapshot', () => {
    // Arrange-Act
    const result = render(
      <Card id={123} deleteCardCallback={()=>{}}/>
    );

    // Assert
    expect(result.asFragment()).toMatchSnapshot();
    cleanup();
  }

  );
})