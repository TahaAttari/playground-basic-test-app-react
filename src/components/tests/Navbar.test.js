import React from 'react';
import {render, screen} from '@testing-library/react'
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import {act} from 'react-dom/test-utils'
import Navbar from '../Navbar';
import * as questionnaireTemplate from '../../assets/questionnaire.json'

test('Check that Links to all pages are visible', async () => {
    let pages = [
        'Patients',
        'Practitioners',
        'Questionnaire'
    ]
    render(
    <MemoryRouter>
        <Navbar/>
    </MemoryRouter>)
    pages.forEach((linkText)=>{
        expect(screen.getByText(linkText)).toBeVisible()
    })
});