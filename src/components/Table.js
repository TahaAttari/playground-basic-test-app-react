import React, { Component } from "react";
import { getPatients } from "../services";
import DatePicker from 'react-date-picker';
import './Table.css'

class Table extends Component {
  state = {
    patients: [],
    birthdate: "",
    name:"",
    accessedOn:""
  };

  handleChange = (event) => {
      let text = event.target.value
      var letterNumber = /^[a-zA-Z ]+$/
      if(text.match(letterNumber) || (text=="")){
        this.setState((state)=>({...state, name:text}));
      }
    }

  componentDidMount() {
    getPatients().then((res) => {
        let now = new Date()
        let accessedOn = now.toDateString() + ' at ' + now.toTimeString()
        this.setState((state)=>({...state, patients: this.flattenPatientObj(res) , accessedOn}));
    });
  }
//   shouldComponentUpdate(nextProps,nextState){
//       return this.state.patients !== nextState.patients
//   }

  flattenPatientObj = (response) => {
    return (response.data.entry || []).map((item) => {
      const name = item.resource.name || [];
      return {
        id: item.resource.id,
        name: (name.length>0)?`${((name[0] || {}).given || []).join(" ")} ${(name[0] || {}).family}`:"",
        gender: item.resource.gender,
        dob: item.resource.birthDate,
      };
    });
  }

  render() {
    const { patients } = this.state;
    return (
        <main>
        {this.state.accessedOn&&(<p style={{fontSize:"12px"}}>Results as of {this.state.accessedOn}</p>)}
        <div className='filter'>
                <label for='name' >Name filter</label>
                <input
            type="text"
            id="name"
            value={this.state.name}
            onChange={this.handleChange}
            ></input>
            <label>Date filter</label>
            <div>
        <DatePicker 
            format={'yy-MM-dd'}
            value={this.state.birthdate} 
            maxDate={new Date()}
            onChange={(date) => {
                this.setState((state)=>({...state, birthdate:date}))
                }} /></div>
                <button
        className='submit'
                onClick={()=>{
                    let query
                    if(this.state.name||this.state.birthdate){
                        query = {}
                        if(this.state.name){
                            query = {...query,name:this.state.name}
                        }
                        if(this.state.birthdate){
                            query = {...query,birthdate:this.state.birthdate.toISOString().split('T')[0]}
                        }
                    }
                    getPatients(query).then((res) => {
                        let now = new Date()
                        let accessedOn = now.toDateString() + ' at ' + now.toTimeString()
                        this.setState((state)=>({...state, patients: this.flattenPatientObj(res), accessedOn }));
                      });
                }}
                >
                    Apply Filters
                </button>
                </div>
        <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Gender</th>
            <th>Date of Birth</th>
          </tr>
        </thead>
        <tbody>
          {patients.sort((a,b)=>{
              let dob_a = a.dob?Date.parse(a.dob):-3155760000000
              let dob_b = b.dob?Date.parse(b.dob):-3155760000000
              return dob_b-dob_a
          }).map((patient) => (
            <tr key={patient.id}>
              <td>{patient.id}</td>
              <td>{patient.name?patient.name:"N/A"}</td>
              <td>{patient.gender?patient.gender:"unknown"}</td>
              <td>{patient.dob?patient.dob:'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </main>
    );
  }
}

export default Table;
