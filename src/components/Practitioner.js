import React, { useState,useEffect } from "react";
import { getPractitioners } from "../services";
import PractitionerCard from "./PractitionerCard";
import ErrorBoundary from "./ErrorBoundary";
import './Practitioner.css'

export const flattenPractitionerObj = (response) => {
  return (response.data.entry || []).map((item) => {
    const name = item.resource.name || [];
    return {
      id: item.resource.id,
      name: `${((name[0] || {}).given || []).join(" ")} ${
        (name[0] || {}).family
      }`,
      gender: item.resource.gender,
      dob: item.resource.birthDate,
      photo:
        "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
    };
  });
};

function Practitioner(){

  const [practitioners,setPractioners] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    setLoading(true)
    getPractitioners().then((res) => {
      setPractioners(flattenPractitionerObj(res));
      setLoading(false)
    });

  },[])

  
  let deletePractitioner = (practitioners,id) =>{
    let filtered = practitioners.filter((value)=>{
      return value.id!==id
    })
    setPractioners(filtered)
  }
  if(!loading){
    return (
      <main>
        <div className="slider">
        {practitioners.map((practitioner,i)=>{
          return (
            <a href={"#"+practitioner.id}>{i+1}</a>
          )
        })}
        <div className={"slides"}>
          {practitioners.map((practitioner)=>{
            practitioner.del = (id)=>{
              deletePractitioner(practitioners,id)
            }
            return <PractitionerCard
            id={practitioner.id}
            name={practitioner.name}
            gender={practitioner.hender}
            dob={practitioner.dob}
            del={practitioner.del}
            photo={practitioner.photo}
            key={practitioner.id}
            />
          })}
          </div>
        </div>
      </main>
    );
  }
  else{
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    )
  }
}

export default Practitioner;
