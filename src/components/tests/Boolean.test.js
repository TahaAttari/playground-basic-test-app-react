import React from 'react';
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import {act} from 'react-dom/test-utils'
import BooleanInput from '../BooleanInput';
import * as questionnaireTemplate from '../../assets/questionnaire.json'


test('Check that label is rendered', async () => {
    let formData = {}
    let setFormData = (data)=>{
        formData = data
    }
    render(<BooleanInput
        formData={formData}
        setFormData={setFormData}
        item={{
            linkId:'1',
            text:"test text"
        }}
        />)
        expect(screen.getByText('test text')).toBeVisible()
});

test('Check that "Yes" means true and "No" means false', async () => {
    let formData = {}
    let setFormData = (data)=>{
        formData = data
    }
    render(<BooleanInput
        formData={formData}
        setFormData={setFormData}
        item={{
            linkId:'1',
            text:"test text"
        }}
        />)
        let TrueButton = screen.getByLabelText(/Yes/i)
        userEvent.click(TrueButton)
        expect(formData['1']).toBe('true')

        let FalseButton = screen.getByLabelText(/No/i)
        userEvent.click(FalseButton)
        expect(formData['1']).toBe('false')

});