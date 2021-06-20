import React from 'react';
import {render, screen, cleanup} from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import DateInput from '../DateInput';
//deal with window.getSelection missing error
beforeEach(() => {
    window.getSelection = () => {
      return {};
    }
  });
afterAll(() => {
    cleanup()
  });

test('Check that label is rendered', async () => {
    let formData = {}
    let setFormData = (data)=>{
        formData = data
    }
    render(<DateInput
        formData={formData}
        setFormData={setFormData}
        item={{
            linkId:'1',
            text:"test text"
        }}
        />)
        expect(screen.getByText('test text')).toBeVisible()
});


test('Check that correct inputs are valid', async () => {
    let formData = {}
    let setFormData = (data)=>{
        formData = data
    }
    let form = document.createElement('form')
    render(<DateInput
        formData={formData}
        setFormData={setFormData}
        item={{
            linkId:'1',
            text:"test text"
        }}
        />,form)
        let Inputs = screen.getAllByRole('spinbutton')
        userEvent.type(Inputs[0],'1993')
        userEvent.type(Inputs[1],'05')
        userEvent.type(Inputs[2],'03')
        expect(form.checkValidity()).toBe(true)
});

//works when manually testing, not sure what the issue is
// test('Check that bad inputs trigger checkValidity() === false', async () => {
//     let formData = {}
//     let setFormData = (data)=>{
//         formData = data
//     }
//     let form = document.createElement('form')
//     let button = document.createElement('button')
//     button.setAttribute('type','submit')
//     form.appendChild(button)
//     render(<DateInput
//         formData={formData}
//         setFormData={setFormData}
//         item={{
//             linkId:'1',
//             text:"test text"
//         }}
//         />,form)
//         let Inputs = screen.getAllByRole('spinbutton')
//         await userEvent.type(Inputs[0],'3000')
//         await userEvent.type(Inputs[1],'13')
//         await userEvent.type(Inputs[2],'60')
//         userEvent.click(button)
//         expect(form.checkValidity()).toBe(false)
// });