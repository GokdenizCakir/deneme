import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('App component should contain a link with the text "learn react"', () => {
  // Arrange
  render(<App />);

  // Act
  const linkElement = screen.getByText(/learn react/i);

  // Assert
  expect(linkElement).toBeInTheDocument();
});
