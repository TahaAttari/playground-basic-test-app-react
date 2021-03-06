import React from 'react';
import { render,cleanup } from '@testing-library/react';
import Questionnaire from '../Questionnaire';
import * as questionnaireTemplate from '../../assets/questionnaire.json'

afterEach(() => {
  cleanup()
});


test('All question text is rendered', () => {
  const { getByText } = render(<Questionnaire />);
  let Questions = []
  for(const item of questionnaireTemplate.item){
    if(item.type!=='group'){
      Questions.push(getByText(item.text))
    }
    else{
      for(const subitem of item.item){
        Questions.push(getByText(subitem.text))
      }
    }
  }
  Questions.forEach((question)=>{
    expect(question).toBeInTheDocument();
  })
});
