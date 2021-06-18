import React, { Component } from "react";
import { getPatients } from "../services";
import DatePicker from 'react-date-picker';

class Table extends Component {
  state = {
    patients: [],
    birthdate: "",
    name:"",
    accessedOn:""
  };

  handleChange = (event) => {
      let text = event.target.value
      this.setState((state)=>({...state, name:text}));
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
        <>
        {this.state.accessedOn&&(<p>Results as of {this.state.accessedOn}</p>)}
      <table>
        <thead>
          <tr>
            <th>
                <button
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
                    Refresh
                </button>
            </th>
            <th><input
            type="text"
            id="name"
            // value={this.state.name}
            onChange={this.handleChange}
            ></input></th>
            <th></th>
            <th>
            <DatePicker 
            format={'yy-MM-dd'}
            value={this.state.birthdate} 
            maxDate={new Date()}
            onChange={(date) => {
                this.setState((state)=>({...state, birthdate:date}))
                }} />
            </th>
          </tr>
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
              <td>{patient.name?patient.name:""}</td>
              <td>{patient.gender}</td>
              <td>{patient.dob}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      </>
    );
  }
}

export default Table;
