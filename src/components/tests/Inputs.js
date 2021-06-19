import React from 'react';
import { render } from '@testing-library/react';
import BooleanInput from "./BooleanInput";
import StringInput from "./StringInput";
import DateInput from "./DateInput";
import * as questionnaireTemplate from '../../assets/questionnaire.json'

test('All ', () => {
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

