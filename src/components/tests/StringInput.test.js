import React from 'react';
import {render, screen, cleanup} from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import {act} from 'react-dom/test-utils'
import StringInput from '../StringInput';
import * as questionnaireTemplate from '../../assets/questionnaire.json'

afterEach(() => {
    cleanup()
  });


test('Check that label is rendered', async () => {
    let formData = {}
    let setFormData = (data)=>{
        formData = data
    }
    render(<StringInput
        formData={formData}
        setFormData={setFormData}
        item={{
            linkId:'1',
            text:"test text"
        }}
        />)
        expect(screen.getByText('test text')).toBeVisible()
});

test('Check that purely alphabetic text is recorded', async () => {
    let formData = {}
    let setFormData = (data)=>{
        formData = data
    }
    render(<StringInput
        formData={formData}
        setFormData={setFormData}
        item={{
            linkId:'1',
            text:"test text"
        }}
        />)
        expect(screen.getByText('test text')).toBeVisible()
        let input = screen.getByLabelText(/test text/i)
        userEvent.type(input,'test input text')
        expect(formData['1']).toBe('test input text')

});

test('Check that numbers are not recorded', async () => {
    let formData = {}
    let setFormData = (data)=>{
        formData = data
    }
    render(<StringInput
        formData={formData}
        setFormData={setFormData}
        item={{
            linkId:'1',
            text:"test text"
        }}
        />)
        expect(screen.getByText('test text')).toBeVisible()
        let input = screen.getByLabelText(/test text/i)
        userEvent.type(input,'1234')
        expect(formData['1']).toBe(undefined)

});