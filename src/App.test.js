import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { render } from '@testing-library/react';
import App from './App';

test('renders title IAI-Learnship', () => {
  const { getByText } = render(<Router><App /></Router>);
  const element = getByText(/IAI-Learnship/i);
  expect(element).toBeInTheDocument();
});
