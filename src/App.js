import React, { Component } from 'react';
import './App.css';
import CustomTable from './Components/CustomTable';
import * as mapData from './stubs/code.json'
import PostalMap from './Components/PostalMap';

class App extends Component {
  constructor() {
    super();
    this.state = {
      target: null
    }
  }

  formatTableData = () => {

    return mapData.info.map((obj) => {
      return {
        "Place": obj.place,
        "Pincode": obj.pin
      }
    })
  }

  setMaker = (data) => {
    let rObj = mapData.info.filter((obj) => obj.place === data['Place'] && obj.pin === data['Pincode']);
    this.setState({
      target: rObj[0]
    });
  }

  render() {
    return (

      <div className="mx-3 my-3">
        <h1 className="appHeader">LogiNext Maps </h1>
        <div className="mt-5 row">
          <div className="col-xs-12 col-sm-6">
            <CustomTable
              data={this.formatTableData()}
              rowsPerPage={10}
              onRowClick={this.setMaker}></CustomTable>
          </div>
          <div className="col-xs-12 col-sm-6">
            <PostalMap target={this.state.target} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
