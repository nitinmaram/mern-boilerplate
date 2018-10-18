import React, { Component } from 'react';
import { Icon, Table } from 'semantic-ui-react'
class TableApp extends Component {
  constructor() {
    super();
    this.state = {
      data: [

    ],
      startDate: '',
      endDate: '',
      fixData: [

    ]
    }
  }
  async componentDidMount() {
    try  {
      const response = await fetch(`/table`)
      const json = await response.json()
      this.setState({ data: json.data, fixData: json.data });
      console.log(this.state.data);
  }
    catch(err) {
      const response = await fetch(`http://localhost:5000`)
      const text = await response.text()
    }
  }

  headerClick(e){
    this.setState({
      [e]: true
    })
    if(this.state[e])
  {
    if(e == 'name'){
      this.state.data.sort(function (a,b) {
        if(a.name.toUpperCase() < b.name.toUpperCase())
        {
          return -1
        }
        if(a.name.toUpperCase() > b.name.toUpperCase()){
          return 1
        }
        return 0
      })
    }
    if(e=='amount')
    {
      this.state.data.sort(function(a,b){
      return b[e]-a[e]
    })
  }
  if(e=='date'){
    this.state.data.sort(function(a,b) {
      a = new Date(a[e]);
      b = new Date(b[e]);
       return a-b;
    })
  }
    this.setState({
      [e]: false
    })
  }
  else{
    if(e=='name'){
      this.state.data.sort(function (a,b) {
        if(b.name.toUpperCase() < a.name.toUpperCase()){
          return -1
        }
        if(b.name.toUpperCase() > a.name.toUpperCase()){
          return 1
        }
        return 0
      })
    }
    if(e=='amount')
    {
      this.state.data.sort(function(a,b){
      return a[e]-b[e]
    })
  }
  if(e=='date'){
    this.state.data.sort(function(a,b) {
      a = new Date(a[e]);
      b = new Date(b[e]);
      return b-a
    })
  }
    this.setState({
      [e]: true
    })
  }
    this.setState({
      data: this.state.data
    })
  }
  handleSubmit(){

    var sd = new Date(document.getElementById('sd').value)
    var ed = new Date(document.getElementById('ed').value)
    if(sd == "Invalid Date" || ed == "Invalid Date"){
      console.log('here');
      var res = this.state.fixData
      console.log(res);
    }
    else
    {
      var res = this.state.fixData.filter(function (obj) {
      console.log(new Date(obj.date) <= ed);
      if(new Date(obj.date) >= sd && new Date(obj.date) <= ed){
        return true
      }
      else{
        return false
      }
    })
  }
  console.log('state');
    this.setState({
      data: res
    })
  }
render(){

  return (
    <div>
    <h1 style = {{marginLeft: '5%'}}>Transactions</h1>
      <Table>
      <Table.Header>
      <Table.Row>
        <Table.HeaderCell onClick = {this.headerClick.bind(this,'name')}>Name<Icon name={this.state.name?'caret up':'dropdown'}/></Table.HeaderCell>
        <Table.HeaderCell onClick = {this.headerClick.bind(this,'amount')}>Amount<Icon name={this.state.amount?'caret up':'dropdown'}/></Table.HeaderCell>
        <Table.HeaderCell onClick = {this.headerClick.bind(this,'date')}>Date<Icon name={this.state.date?'caret up':'dropdown'}/></Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
    {this.state.data.map(function (row) {
      console.log(row);
      return (
      <Table.Row>
        <Table.Cell>{row.name}</Table.Cell>
        <Table.Cell>{row.amount}</Table.Cell>
        <Table.Cell>{new Date(row.date).toDateString()}</Table.Cell>
      </Table.Row>
    )}
  )}
    </Table.Body>
      </Table>
    <div style = {{marginLeft: '5%', marginTop: '2%'}}>
    <input type = 'text' id = 'sd' placeholder = "mm-dd-yyyy" /><br/>
    <input type = 'text' id = 'ed' placeholder = "mm-dd-yyyy" /><br/>
    <button onClick = {this.handleSubmit.bind(this)}>submit</button>
    </div>
    </div>
  );
}
}
export default TableApp;
