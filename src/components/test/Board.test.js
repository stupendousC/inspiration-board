import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Board from '../Board';

describe('Board', () => {

  test('matches existing snapshot', () => {
    //Arrange-Act

    const result = render(
      <Board baseURL="base" URL="abc" boardName="xyz"/>
    );

    //Assert
      expect(result.asFragment()).toMatchSnapshot();
      cleanup();
  })

});