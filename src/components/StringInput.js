import React from "react";

function StringInput({formData,setFormData,item,parent=undefined}) {
    return(
        <div
        key={item.linkId}
        id={'question-'+item.linkId}
        className="string-input-wrapper"
        >
        <label
        className="string-input-label"
        >{item.text}</label>
        <input
        className="string-input"
        value={parent?formData[parent][item.linkId]:formData[item.linkId]}
        type={'text'}
        onChange={(event)=>{
            let text = event.target.value
            var letterNumber = /^[a-zA-Z ]+$/
            if(text.match(letterNumber) || (text=="")){
                if(parent){
                    setFormData({...formData,[parent]:{...formData[parent], [item.linkId]:text}})
                }
                else{
                    setFormData({...formData,[item.linkId]:text})
                }
            }
        }}
        ></input>
        </div>
    )
}
export default StringInput