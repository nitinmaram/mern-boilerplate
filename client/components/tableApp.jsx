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
      console.log(json.data);
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
  handleFilter(){

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
  addClick(i){
this.state.data.push({name: '',amount: 0,date: new Date().toDateString()})
this.setState({
  data: this.state.data
})
  }
  editClick(i){
    this.setState({
      ['name'+i]: !this.state['name'+i],
      ['amount'+i]: !this.state['amount'+i],
      ['date'+i]: !this.state['date'+i]
    })
  }
  deleteClick(i){
    console.log(i);
    this.state.data.splice(i, 1);
    this.setState({
      data: this.state.data
    })
    if(this.state.data.length == 0){
      this.addClick()
    }
  }
  nameChange(i,e){
    this.state.data[i].name = e.target.value
    this.setState({
      'data': this.state.data
    })
  }
  amountChange(i,e){
    this.state.data[i].amount = e.target.value
    this.setState({
      'data': this.state.data
    })
  }
  dateChange(i,e){
    this.state.data[i].date = e.target.value
    this.setState({
      'data': this.state.data
    })
  }
  async submitClick(){
    let options = {
      method: "POST",
      headers: {
           "Content-Type": "application/json; charset=utf-8"
       },
       body: JSON.stringify({data: this.state.data})
    }
    console.log(options);
    const response = await fetch(`/table/add`,options)
    const text = await response.text()
    console.log(text);
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
    {this.state.data.map((row, i) => {
      return (
      <Table.Row>
        <Table.Cell>{this.state['name'+i] ? <input type = 'text' id= {'name'+i} value = {row.name}
        onChange = {this.nameChange.bind(this,i)}/>:  row.name}</Table.Cell>
        <Table.Cell>{this.state['amount'+i] ? <input type = 'number' id= {'amount'+i} value = {row.amount}
        onChange = {this.amountChange.bind(this,i)}/>: row.amount}</Table.Cell>
        <Table.Cell>
        {this.state['date'+i] ? <input type = 'text' id= {'date'+i} value = {new Date(row.date).toDateString()}
        onChange = {this.dateChange.bind(this,i)}/>: new Date(row.date).toDateString()}
        &nbsp;&nbsp;&nbsp;<button onClick = {this.editClick.bind(this,i)}>edit</button>
          &nbsp;&nbsp;&nbsp;<button onClick = {this.deleteClick.bind(this,i)}>delete</button>
        &nbsp;&nbsp;&nbsp;{this.state.data.length-1 == i ? <button onClick = {this.addClick.bind(this,i)}>add</button>:null}
        </Table.Cell>
      </Table.Row>
    )}
  )}
    </Table.Body>
      </Table>
    <div style = {{marginLeft: '5%', marginTop: '2%'}}>
    <button onClick = {this.submitClick.bind(this)}>Submit</button> <br/><br/>
    Search: <input type = 'text' id = 'search' placeholder = "  anything" onChange = {this.handleSearch.bind(this)}/><br/><br/>
    Filter:<br/>
    start date: <input type = 'text' id = 'sd' placeholder = "  mm-dd-yyyy" />&nbsp;&nbsp;
    end date: <input type = 'text' id = 'ed' placeholder = "  mm-dd-yyyy" /> &nbsp;&nbsp;
    <button onClick = {this.handleFilter.bind(this)}>Filter</button> <br/><br/>
    <br/><br/>
    <hr/>
    </div>
    </div>
  );
}
}
export default TableApp;
