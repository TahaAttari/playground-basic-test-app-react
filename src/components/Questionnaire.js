import React, { useState } from "react";
import questionnaire from '../assets/questionnaire.json'
import DatePicker from 'react-date-picker';

function Questionnaire() {
    const [validationSchema, setValidationSchema] = useState({});
    const [response, setResponse] = useState({});
    const initForm = (questionnaire) => {
        let _formData = {}
        for(const item of questionnaire.item){
            if(item.type==='group'){
                _formData[item.linkId] = {}
                for(const subitem of item.item){
                    _formData[item.linkId][subitem.linkId] = "";
                }
            }
            else{
                _formData[item.linkId] = "";
            }
        }
        return _formData
    }
    const [formData, setFormData] = useState(initForm(questionnaire));
    //TODO : extend this to cover all possible values
    const ValueDict = {
        boolean:'valueBoolean',
        date:'valueDate',
        string:'valueString'
    }
    let createStringInput = (item, parent=undefined)=>(
        <div
        key={item.linkId}
        >
        <label>{item.text}</label>
        <input
         
        value={parent?formData[parent][item.linkId]:formData[item.linkId]}
        type={'text'}
        onChange={(event)=>{
            let text = event.target.value
            if(parent){
                setFormData({...formData,[parent]:{...formData[parent], [item.linkId]:text}})
            }
            else{
                setFormData({...formData,[item.linkId]:text})
            }
        }}
        ></input>
        </div>
    )
    let createBooleanInput = (item, parent=undefined)=>(
        <div
        key={item.linkId}
        value={parent?formData[parent][item.linkId]:formData[item.linkId]}
        onChange={(event)=>{
            let text = event.target.value
            if(parent){
                setFormData({...formData,[parent]:{...formData[parent], [item.linkId]:text}})
            }
            else{
                setFormData({...formData,[item.linkId]:text})
            }
        }}
        >
        <label>{item.text}</label>
        <input type="radio" value="true" name={item.linkId} /> Yes
        <input type="radio" value="false" name={item.linkId} /> No
        </div>
    )
    let createDateInput = (item, parent)=>(
        <div
        key={item.linkId}
        >
        <label>{item.text}</label>
        <DatePicker 
        format={'yy-MM-dd'}
        value={parent?formData[parent][item.linkId]:formData[item.linkId]} 
        maxDate={new Date()}
        onChange={(date)=>{
            if(parent){
                setFormData({...formData,[parent]:{...formData[parent], [item.linkId]:date}})
            }
            else{
                setFormData({...formData,[item.linkId]:date})
            }
        }}
            />
        </div>
    )

    return(
        <>
        <div>
            <form>
        {questionnaire.item.map((item)=>{
            if(item.type!=='group'){
                if(item.type==='boolean'){
                    return createBooleanInput(item)
                }
                else if(item.type==='date'){
                    return createDateInput(item)
                }
                else {
                    return createStringInput(item)
                }
            }
            else{
                return(
                    <div
                    key={item.linkId}
                    >
                        <h3>{item.text}</h3>
                        {item.item.map((subitem)=>{
                            if(subitem.type==='boolean'){
                                return createBooleanInput(subitem,item.linkId)
                            }
                            else if(subitem.type==='date'){
                                return createDateInput(subitem,item.linkId)
                            }
                            else{
                                return createStringInput(subitem,item.linkId)
                            }

                        })}
                    </div>
                )
            }
        })}
        
            </form>
            <button
        onClick={()=>{
            let response = {
                status:'completed',
                questionnaire:questionnaire.url,
                authored:new Date().toISOString(),
                item:[]
            }
            for(const item of questionnaire.item){
                if(item.type!=='group'){
                    response.item.push(
                        {
                            linkId:item.linkId,
                            text:item.text,
                            answer:{
                                [ValueDict[item.type]]:formData[item.linkId]
                            }
                        }
                    )
                }
                else{
                    let groupItem = []
                    for(const subItem of item.item){
                        groupItem.push(
                            {
                                linkId:subItem.linkId,
                                text:subItem.text,
                                answer:{
                                    [ValueDict[subItem.type]]:formData[item.linkId][subItem.linkId]
                                }
                            }
                        )
                    }
                    response.item.push({
                        linkId:item.linkId,
                        text:item.text,
                        item:groupItem
                    })
                }
            }
            setResponse(response)
        }}
        >
            Submit
        </button>
        </div>
        <pre>
        {JSON.stringify(response,null,2)}
        </pre>
        </>
    )
}


export default Questionnaire;
