import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders "LightWire"', () => {
  render(<App />);
  const linkElement = screen.getByText('LightWire');
  expect(linkElement).toBeInTheDocument();
});
