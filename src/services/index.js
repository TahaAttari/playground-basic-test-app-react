import _axios from "axios";

const axios = _axios.create({
  baseURL: "http://hapi.fhir.org/baseR4",
});

export const getPatients = (query=undefined) => {
  if(query){
    let queryString = "?"
    for (const [key,value] of Object.entries(query)){
      queryString += `${key}=${value},`
    }
    return axios.get("/Patient"+ queryString);
  }
  else{
    return axios.get("/Patient");
  }
};

export const getPractitioners = () => {
  return axios.get("/Practitioner");
};
