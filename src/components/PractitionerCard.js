import React from "react";
function PractitionerCard({props}){
    let data = {}
    for(const [key,value] of Object.entries(props)){
        if(!value){
            data[key]="N/A"
        }
        else{
            data[key]=value
        }
    }
    return(
        <div>
            <img
                  src={data.photo}
                  alt="Avatar"
                  style={{ height: 50, width: 50, borderRadius: "50%" }}
                />
            <h3>Name : {data.name}</h3>
            <p>Gender : {data.gender}</p>
            <p>DOB : {data.dob}</p>
            <code>{data.id}</code>
            <button
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