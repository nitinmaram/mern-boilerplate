import React, { Component } from 'react';
import { Icon, Table } from 'semantic-ui-react'
class TableApp extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      startDate: '',
      endDate: '',
      fixData: [],
      prev: [],
      StartDate: new Date()
    }
  }
  async componentDidMount(){
    try  {
      const response = await fetch(`/table`)
      const json = await response.json()
      this.setState({ data: json.data, fixData: json.data });
  }
    catch(err) {
      const response = await fetch(`/table`)
      const text = await response.text()
    }
  }
  headerClick(e){
    this.state.prev.push(e)
    this.state.prev.forEach((item)=>{
      if(item != e){
        this.setState({
          [item]: false
        })
      }
    })
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
      var res = this.state.fixData
    }
    else
    {
      var res = this.state.fixData.filter(function (obj) {
      if(new Date(obj.date) >= sd && new Date(obj.date) <= ed){
        return true
      }
      else{
        return false
      }
    })
  }
    this.setState({
      data: res
    })
  }
  handleSearch(){
    let arr = []
    let query = document.getElementById('search').value
    if(query.includes("-")){
      if(new Date(query) != "Invalid Date")
        {
           arr = this.state.fixData.filter((item)=>{
             console.log(new Date(item.date), "-", new Date(query));
            return new Date(item.date).getTime() == new Date(query).getTime() || new Date(item.date) > new Date(query)
          })
        }

    }

    else if(!isNaN(parseInt(query))){
      console.log(parseInt(query));
      arr = this.state.fixData.filter((item) =>{
        return item.amount == parseInt(query) || item.amount > parseInt(query)
      })
    }
    else{
      arr = this.state.fixData.filter((item)=>{
        return item.name.toLowerCase().includes(query.toLowerCase())
      })

    }
    if(arr.length > 0){
      this.setState({
        data: arr
      })
    }
    }
  handleChange(date) {
    this.setState({
      startDate: date
    });
  }
render(){

  return (
    <div>
    <h1 style = {{marginLeft: '5%'}}>Transactions</h1>
      <Table>
      <Table.Header>
      <Table.Row>
        <Table.HeaderCell style = {{cursor: 'pointer'}} onClick = {this.headerClick.bind(this,'name')}>Name<Icon name={this.state.name?'caret up':'dropdown'}/></Table.HeaderCell>
        <Table.HeaderCell style = {{cursor: 'pointer'}} onClick = {this.headerClick.bind(this,'amount')}>Amount<Icon name={this.state.amount?'caret up':'dropdown'}/></Table.HeaderCell>
        <Table.HeaderCell style = {{cursor: 'pointer'}} onClick = {this.headerClick.bind(this,'date')}>Date<Icon name={this.state.date?'caret up':'dropdown'}/></Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
    {this.state.data.map((row) => {
      return (
      <Table.Row>
        <Table.Cell>{row.name}</Table.Cell>
        <Table.Cell>{row.amount}</Table.Cell>
        <Table.Cell>{new Date(row.date).toDateString()}
        </Table.Cell>
      </Table.Row>
    )}
  )}
    </Table.Body>
      </Table>
    <div style = {{marginLeft: '5%', marginTop: '2%'}}>
    <input type = 'text' id = 'sd' placeholder = "mm-dd-yyyy" /><br/>
    <input type = 'text' id = 'ed' placeholder = "mm-dd-yyyy" /><br/>
    <button onClick = {this.handleSubmit.bind(this)}>submit</button><br/>
    <hr/>
    <input type = 'text' id = 'search' placeholder = "search" onChange = {this.handleSearch.bind(this)}/><br/>
    </div>
    </div>
  );
}
}
export default TableApp;
