import React from "react";
import DatePicker from 'react-date-picker';

function DateInput({formData,setFormData,item,parent=undefined}) {
    return(
        <div
            key={item.linkId}
            id={'question-'+item.linkId}
            className="date-input-wrapper"
        >
            <label
                className="date-input-label">
                {item.text}
            </label>
            <DatePicker 
                className="date-input"
                format={'yy-MM-dd'}
                value={parent?formData[parent][item.linkId]:formData[item.linkId]} 
                maxDate={new Date()}
                minDate={new Date('1900-01-01')}
                onChange={(date)=>{
                    if(date<(new Date())){
                        if(parent){
                            setFormData({...formData,[parent]:{...formData[parent], [item.linkId]:date}})
                        }
                        else{
                            setFormData({...formData,[item.linkId]:date})
                        }
                    }
                }}
            />
        </div>
    )
}
export default DateInput