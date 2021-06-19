import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('Navigation possible to all elements', () => {
  const { getByText } = render(<App />);
  const Links = [
    getByText(/Patients/i),
    getByText(/Practitioners/i),
    getByText(/Questionnaire/i),
  ]
  Links.forEach((link)=>{
    expect(link).toBeInTheDocument();
  })
});
