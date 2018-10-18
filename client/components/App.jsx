import React, {Component} from 'react';

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      catMsg : "Gandu Pilli",

    }

  }
  hClick(e){
    console.log("start")
    this.setState({
      [e]: true
    })
    if(this.state[e]){
      console.log("haiii")
    }
  }
  // showMessage = () => { 
  //   console.log('into showmsg')
  //   this.setState((prevState,props)=>{{
  //     catMsg : `${prevState.catMsg} Meow`
  //   }},()=>{
  //     let msg = async ()=>{
  //       await setTimeout(() => {
  //         return "awaited"
  //       }, 1000);
  //     }
  //     console.log(msg())
  //   })
  // }
  // handleClick(e){
  //   this.setState({
  //     [e]: 'hai'
  //   })
  // }
  render() {
    // console.log(this.state.catMsg)
    return (
      <div className='App'>
        <br />
        <p>This is just a minimal boilerplate for a MERN based webapp.</p>
        <div onClick={this.hClick.bind(this,"jeio")}>Click Me</div>
      </div>
    );
  }
}
