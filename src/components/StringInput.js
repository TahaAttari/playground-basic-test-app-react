import React from "react";

function StringInput({formData,setFormData,item,parent=undefined}) {
    return(
        <div
            key={item.linkId}
            id={'question-'+item.linkId}
            className="string-input-wrapper"
        >
            <label
                htmlFor={item.linkId}
                className="string-input-label">
                {item.text}
            </label>
            <input
                id={item.linkId}
                className="string-input"
                value={parent?formData[parent][item.linkId]:formData[item.linkId]}
                type={'text'}
                pattern={"[a-zA-Z ]*"}
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
            />
        </div>
    )
}
export default StringInput