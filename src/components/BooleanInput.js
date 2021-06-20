import React from "react";

function BooleanInput({formData,setFormData,item,parent=undefined}) {
    return(
        <div
            key={item.linkId}
            id={'question-'+item.linkId}
            value={parent?formData[parent][item.linkId]:formData[item.linkId]}
            className="boolean-input-wrapper"
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
            <label
                className="booleam-input-label" >
                {item.text}
            </label>
            <div className='radio-input-wrapper'>
                <input 
                    className="radio-input"
                    type="radio" 
                    value="true" 
                    id={item.linkId+'-true'}
                    name={item.linkId} /> 
                <label 
                    htmlFor={item.linkId+'-true'}
                    className='radio-label'>
                    Yes
                </label>
                <input 
                    className="radio-input"
                    type="radio" 
                    value="false" 
                    id={item.linkId+'-false'}
                    name={item.linkId} />
                <label 
                className='radio-label'
                htmlFor={item.linkId+'-false'}
                >
                    No
                </label>
            </div>
        </div>
    )
}
export default BooleanInput