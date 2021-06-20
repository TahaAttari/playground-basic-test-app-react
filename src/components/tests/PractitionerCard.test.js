import React from 'react';
import {render, screen, cleanup} from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import {act} from 'react-dom/test-utils'
import PractitionerCard from '../PractitionerCard';
import * as questionnaireTemplate from '../../assets/questionnaire.json'

afterAll(() => {
    cleanup()
  });


// test('Check that all Data is visible', async () => {
//     let test = 'not deleted'
//     let props = {
//         id:'1',
//         name:'Test Name',
//         dob: '1990-01-01',
//         gender:'testGender',
//         photo:"https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
//         delete:(id)=>{test=id+ ' deleted'}
//     }
//     render(
//     <PractitionerCard 
//     props={props}
//     />)
//     Object.entries(props).forEach(([key,value])=>{
//         if(key!=='photo'){
//             expect(screen.getByText(value)).toBeVisible()
//         }
//     })
// });

test('Check that the delete button works', async () => {
    let test = 'not deleted'
    let props = {
        id:'1',
        name:'Test Name',
        dob: '1990-01-01',
        gender:'testGender',
        photo:"https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
        delete:(id)=>{test=id+ ' deleted'}
    }
    render(
    <PractitionerCard 
    props={props}
    />)
    let DeleteButton = screen.getByRole('button')
    userEvent.click(DeleteButton)
    expect(test).toBe('1 deleted')
});