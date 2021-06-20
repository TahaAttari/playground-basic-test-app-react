import React from "react";
import PropTypes from 'prop-types';


function PractitionerCard({id,name,dob,gender,photo,del,key}){
    let data = {}
    let props = {id,name,dob,gender,photo,del,key}
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
                    props.del(props.id)
                }}
            >
                Delete
            </button>
        </div>
    )
}

PractitionerCard.propTypes = {
    id:PropTypes.string,
    name:PropTypes.string,
    gender:PropTypes.string,
    photo:PropTypes.string,
    del:PropTypes.func,
    key:PropTypes.string
}


export default PractitionerCard