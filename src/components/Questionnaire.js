import React, { useState } from "react";
import questionnaire from '../assets/questionnaire.json'
import DatePicker from 'react-date-picker';
import BooleanInput from "./BooleanInput";
import StringInput from "./StringInput";
import DateInput from "./DateInput";
import "./Questionnaire.css";


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

    return(
        <main>
        <div>
            <form>
        {questionnaire.item.map((item)=>{
            if(item.type!=='group'){
                if(item.type==='boolean'){
                    return <BooleanInput
                    formData={formData}
                    setFormData={setFormData}
                    item={item}
                    />
                }
                else if(item.type==='date'){
                    return <DateInput
                    formData={formData}
                    setFormData={setFormData}
                    item={item}
                    />
                }
                else {
                    return <StringInput
                    formData={formData}
                    setFormData={setFormData}
                    item={item}
                    />
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
                                return <BooleanInput
                                formData={formData}
                                setFormData={setFormData}
                                item={subitem}
                                parent={item.linkId}
                                />
                            }
                            else if(subitem.type==='date'){
                                return <DateInput
                                formData={formData}
                                setFormData={setFormData}
                                item={subitem}
                                parent={item.linkId}
                                />
                            }
                            else{
                                return <StringInput
                                formData={formData}
                                setFormData={setFormData}
                                item={subitem}
                                parent={item.linkId}
                                />
                            }

                        })}
                    </div>
                )
            }
        })}
        
            </form>
            <button
            className="submit"
            style={{width:'100%'}}
        onClick={()=>{
            let response = {
                status:'completed',
                questionnaire:questionnaire.url,
                authored:new Date().toISOString(),
                item:[]
            }
            for(const item of questionnaire.item){
                if(item.type!=='group'){
                    if(formData[item.linkId]){
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
                        response.item.push(
                            {
                                linkId:item.linkId,
                                text:item.text,
                            }
                        )
                    }
                }
                else{
                    let groupItem = []
                    for(const subItem of item.item){
                        if(formData[item.linkId][subItem.linkId]){
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
                        else{
                            groupItem.push(
                                {
                                    linkId:subItem.linkId,
                                    text:subItem.text,
                                }
                            )
                        }
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
        </main>
    )
}


export default Questionnaire;
