import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
function Button(props){
  return(
    <button className={props.className} onClick={props.onClick}>{props.value}</button>
  );
}
function Screen(props){
  return(
    <div className="calc-typed" type="text" name="display" id="display"  disabled>{props.value}</div>
  );
}
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      total:"0",
      num1:"",
      num2:"",
      func:"",
      history:[],
      updated:"",
    }
  }
  renderButton(num){
    return <Button className="button" onClick={()=> this.addNum(num)}value={num}/>;
  }
  renderHistoryScreen(){
    return <div class="calc-operation">{this.state.history}</div>
  }
  renderClearButton(){
    return <Button className="button c" onClick={()=> this.clear()}value="C"/>;
  }
  renderFuncButton(sign){
    return <Button className="button 1" onClick={()=> this.setFunc(sign)}value={sign}/>;
  }
  renderScreen(tot){
    return <Screen value={this.state.total} />;
  }
  setFunc(sign){
    if(sign !== '='){
      this.setState({func:sign,updated:"func"},()=>{this.updateHist()})
    }else{
      this.doCalc();
    }
  }
  clear(){
    this.setState({total:"0",num1:"",num2:"",func:"",history:[],updated:""})
  }
  doCalc(){
    let ans;
    ans = eval(this.state.num1 + this.state.func + this.state.num2)
    this.setState({total:ans,num1:ans,num2:"",func:"",history:[ans]})
  }
  addNum(num){
    let joined;
    let newNum;
    if(!this.state.func){
      this.setState({num1:this.state.num1 !== "" ?''+this.state.total+num:num,
      total:this.state.num1 !== "" ?''+this.state.total+num:num,updated:"num1"},()=> {
        this.updateHist();

    })

    }else{
      this.setState({num2:this.state.num2 !== "" ?''+this.state.total+num:num,
      total:this.state.num2 !== "" ?''+this.state.total+num:num,updated:"num2"},()=>{this.updateHist()})
    }
  }
  updateHist(){
    let copyArray = this.state.history.slice();
    let addition;
    switch(this.state.updated){
        case "num1":
            try{
              addition = this.state.num1.toString()[this.state.num1.toString().length-1]
            }catch(e){
              addition = this.state.num1
            }
            copyArray.push(addition)
            this.setState({history:copyArray})

            break;
        case "num2":
            //if(this.state.num2 !== prevState.num2){
            try{
              addition = this.state.num2.toString()[this.state.num2.toString().length-1]
            }catch(e){
              addition = this.state.num2
            }
            copyArray.push(addition);
            this.setState({history:copyArray});
            //};
            break;
        case "func":
            //if(this.state.func !== prevState.func){
            try{
              addition = this.state.func[this.state.func.length-1];
            }catch(e){
              addition = this.state.func;
            }
              copyArray.push(addition);
              this.setState({history:copyArray});
            //};
            break;
        default: break;
      }
}

  render() {
    return (
      <div class="container">
  <div class="calc-body">
    <div class="calc-screen">
    {this.renderHistoryScreen()}
    {this.renderScreen()}
    </div>
    <div class="calc-button-row">
      {this.renderClearButton()}
      {this.renderFuncButton('≠')}
      {this.renderFuncButton('%')}
      {this.renderFuncButton('/')}
    </div>
    <div class="calc-button-row">
      {this.renderButton(7)}
      {this.renderButton(8)}
      {this.renderButton(9)}
      {this.renderFuncButton('*')}
    </div>
    <div class="calc-button-row">
      {this.renderButton(4)}
      {this.renderButton(5)}
      {this.renderButton(6)}
      {this.renderFuncButton('-')}
    </div>
    <div class="calc-button-row">
      {this.renderButton(1)}
      {this.renderButton(2)}
      {this.renderButton(3)}
      {this.renderFuncButton('+')}
    </div>
    <div class="calc-button-row">
      {this.renderButton('.')}
      {this.renderButton(0)}
      {this.renderFuncButton('=')}
      </div>
    </div>
  </div>
//       <body>
//     <div>
//         <div class="header">
//             {this.renderScreen()}
//         </div>
//         <div class="numberFields">
//           {this.renderButton(1)}
//           {this.renderButton(2)}
//           {this.renderButton(3)}
//           {this.renderButton(4)}
//           {this.renderButton(5)}
//           {this.renderButton(6)}
//           {this.renderButton(7)}
//           {this.renderButton(8)}
//           {this.renderButton(9)}
//           {this.renderButton(0)}
//         </div>
//         <div class="operations">
//             {this.renderFuncButton('+')}
//             {this.renderFuncButton('-')}
//             {this.renderFuncButton('*')}
//             {this.renderFuncButton('/')}
//             {this.renderClearButton()}
//         </div>
//         <div>
//             {this.renderFuncButton('=')}
//         </div>
//     </div>
// </body>
    );
  }
}

export default App;
