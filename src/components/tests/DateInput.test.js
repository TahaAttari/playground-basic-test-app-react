import React from 'react';
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import DateInput from '../DateInput';


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

// Not able to make the input work correctly on this

// test('Check that correct inputs are valid', async () => {
//     let formData = {}
//     let setFormData = (data)=>{
//         formData = data
//     }
//     let form = document.createElement('form')
//     render(<DateInput
//         formData={formData}
//         setFormData={setFormData}
//         item={{
//             linkId:'1',
//             text:"test text"
//         }}
//         />,form)
//         let Inputs = screen.getAllByRole('spinbutton')
//         userEvent.type(Inputs[0],'1993')
//         userEvent.type(Inputs[1],'05')
//         userEvent.type(Inputs[2],'03')
//         expect(form.checkValidity()).toBe(true)
// });

// test('Check that bad inputs trigger checkValidity() === false', async () => {
//     let formData = {}
//     let setFormData = (data)=>{
//         formData = data
//     }
//     let form = document.createElement('form')
//     let output = render(<DateInput
//         formData={formData}
//         setFormData={setFormData}
//         item={{
//             linkId:'1',
//             text:"test text"
//         }}
//         />,form)
//         let Inputs = acreen.getAllByRole('spinbutton')
//         userEvent.type(Inputs[0],'3000')
//         userEvent.type(Inputs[1],'5')
//         userEvent.type(Inputs[2],'3')
//         expect(form.checkValidity()).toBe(false)
// });