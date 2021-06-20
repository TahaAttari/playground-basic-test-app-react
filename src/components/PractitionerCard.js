import React from "react";
function PractitionerCard({props}){
    let data = {}
    //clean up undefined/missing values
    for(const [key,value] of Object.entries(props)){
        if(!value){
            data[key]="N/A"
        }
        else{
            data[key]=value
        }
    }
    return(
        <div
        id={data.id}
        >
            <img
                src={data.photo}
                alt="Avatar"
                className='avatar'
            />
            <h3>{data.name}</h3>
            <p>Gender : {data.gender}</p>
            <p>DOB : {data.dob}</p>
            <code>{data.id}</code>
            <button
                className='delete'
                onClick={()=>{
                    props.delete(props.id)
                }}
            >
                Delete
            </button>
        </div>
    )
}
export default PractitionerCard