import React, { Component } from "react";
// import { getPatients } from "./services";
import Table from "./components/Table";

class App extends Component {
  // componentDidMount() {
  //   getPatients().then((res) => {
  //     console.log(res);
  //   });
  // }
  render() {
    return <Table />;
  }
}

export default App;
