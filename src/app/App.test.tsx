import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from './App';

test('renders Home link', () => {
  render(<App />);
  const linkElement = screen.getByText('Home');
  expect(linkElement).toBeInTheDocument();
});

test('renders List link', () => {
  render(<App />);
  const linkElement = screen.getByText('List');
  expect(linkElement).toBeInTheDocument();
});
