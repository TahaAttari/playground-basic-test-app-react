import React from 'react';
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import { getPatients } from "../../services";
import {act} from 'react-dom/test-utils'
import Table, {flattenPatientObj} from '../Table';
import * as questionnaireTemplate from '../../assets/questionnaire.json'

test('Check that data is visible', async () => {
    let res = await getPatients()
    let PatientData = flattenPatientObj(res)
    const keys = [
        'id',
        'name',
        'dob',
        'gender'
    ]
    render(
        <Table 
        />)
    //wait for data to populate
    const FirstEntry = await screen.findByText(PatientData[0].id)
    PatientData.forEach((item)=>{
        keys.forEach((key)=>{
            //this test is not robust to duplicate data 
            //being missed but ensures at least that all 
            //ids are visible
            if(item[key]){
                expect(screen.getAllByText(item[key])[0]).toBeVisible()
            }
        })
    })
});

test('Check name query output', async () => {
    let query = {
        name:'a'
    }
    let res = await getPatients(query)
    let PatientData = flattenPatientObj(res)
    const keys = [
        'id',
        'name',
        'dob',
        'gender'
    ]
    render(
        <Table 
        />)
    let NameInput = await screen.findByLabelText('Name filter')
    userEvent.type(NameInput, 'a')
    userEvent.click(await screen.findByText('Apply Filters'))
    const FirstEntry = await screen.findByText(PatientData[0].id)
    PatientData.forEach((item)=>{
        keys.forEach((key)=>{
            //this test is not robust to duplicate data 
            //being missed but ensures at least that all 
            //ids are visible
            if(item[key]){
                expect(screen.getAllByText(item[key])[0]).toBeVisible()
            }
        })
    })
})
