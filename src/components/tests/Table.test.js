import React from 'react';
import {render, screen, cleanup} from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import { getPatients } from "../../services";
import {act} from 'react-dom/test-utils'
import Table, {flattenPatientObj} from '../Table';
import * as questionnaireTemplate from '../../assets/questionnaire.json'

beforeEach(() => {
    window.getSelection = () => {
      return {};
    }
  });
  afterAll(() => {
    cleanup()
  });


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

test('Check year validation', async () => {

    render(
        <Table 
        />)

    let DateInputs = await screen.findAllByRole('spinbutton')
    //year input
    userEvent.type(DateInputs[0],'3000')
    //month input
    userEvent.type(DateInputs[1],'01')
    //day input
    userEvent.type(DateInputs[2],'01')

    userEvent.click(await screen.findByText('Apply Filters'))
    let alert = await screen.findByText('Please check your inputs!')
    expect(alert).toBeVisible()
})
test('Check month validation', async () => {

    render(
        <Table 
        />)

    let DateInputs = await screen.findAllByRole('spinbutton')
    //year input
    userEvent.type(DateInputs[0],'1993')
    //month input
    userEvent.type(DateInputs[1],'15')
    //day input
    userEvent.type(DateInputs[2],'01')

    userEvent.click(await screen.findByText('Apply Filters'))
    let alert = await screen.findByText('Please check your inputs!')
    expect(alert).toBeVisible()
})
test('Check day validation', async () => {

    render(
        <Table 
        />)

    let DateInputs = await screen.findAllByRole('spinbutton')
    //year input
    userEvent.type(DateInputs[0],'1993')
    //month input
    userEvent.type(DateInputs[1],'01')
    //day input
    userEvent.type(DateInputs[2],'60')

    userEvent.click(await screen.findByText('Apply Filters'))
    let alert = await screen.findByText('Please check your inputs!')
    expect(alert).toBeVisible()
})
