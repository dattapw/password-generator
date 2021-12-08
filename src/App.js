import React, { Component } from 'react';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      password: null,
      password_length: 32,
      A_Z: true,
      a_z: true,
      n0_9: true,
      special_chars: true,
      minimum_numbers: 1,
      minimum_special: 1,
      regenerate: 32
     }

  }

  componentDidMount() {
    this.generatePassword();
  }

  generatePassword = () => {

    if(!this.state.A_Z && !this.state.a_z && !this.state.n0_9 && !this.state.special_chars) return false;

    let randomIndex = 0;

    const capitalAlphabets = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    const lowerCaseAlphabets = capitalAlphabets.map((v) => v.toLowerCase());
    const numbers = Array(10).fill(null).map((v,i)=>i);
    const special = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'];

    let passwordCharacterArray = [];

    /**
     * Process minimum numbers
     */
    if(this.state.n0_9) {
      for(let i=0; i < this.state.minimum_numbers; i++) {

        let randomIndex = Math.floor(Math.random()*10);
        passwordCharacterArray.push(numbers[randomIndex]);
  
      }
    }

    /**
     * Process minimum special characters
     */
    if(this.state.special_chars) {
      for(let i=0; i < this.state.minimum_special; i++) {

        let randomIndex = Math.floor(Math.random()*special.length);
        passwordCharacterArray.push(special[randomIndex]);
  
      }
    }

    let remainingCharacterLength = this.state.password_length - this.state.minimum_numbers - this.state.minimum_special;

    for(let i=0; i < remainingCharacterLength; i++) {

      const randomIndex1 =  Math.floor(Math.random()*4);

      switch(randomIndex1) {
        case 0:
          if(!this.state.A_Z) {i--; continue;}
          randomIndex = Math.floor(Math.random()*capitalAlphabets.length);
          passwordCharacterArray.push(capitalAlphabets[randomIndex]);
          break;
        case 1:
          if(!this.state.a_z){i--; continue;}
          randomIndex = Math.floor(Math.random()*lowerCaseAlphabets.length);
          passwordCharacterArray.push(lowerCaseAlphabets[randomIndex]);
          break;
        case 2:
          if(!this.state.n0_9){i--; continue;}
          randomIndex = Math.floor(Math.random()*numbers.length);
          passwordCharacterArray.push(numbers[randomIndex]);
          break;
        case 3:
          if(!this.state.special_chars){i--; continue;}
          randomIndex = Math.floor(Math.random()*special.length);
          passwordCharacterArray.push(special[randomIndex]);
          break;
      }

    }

    for(let i=0; i < passwordCharacterArray.length; i++) {
      for(let j=0; j < passwordCharacterArray.length; j++) {
        let randomIndex = Math.floor(Math.random()*passwordCharacterArray.length);
        let temp = passwordCharacterArray[j];
        passwordCharacterArray[j] = passwordCharacterArray[randomIndex];
        passwordCharacterArray[randomIndex] = temp;
      }
    }

    this.setState({password: passwordCharacterArray.join("")});

    return passwordCharacterArray.join("");

  }

  copyToClipboard(p) {
    console.log("copy clipboard: ", p);
    navigator.clipboard.writeText(p);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="password-preview">{this.state.password}</div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="regenerate-password" onClick={this.generatePassword}>
              Regenerate Password
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="copy-password" onClick={()=>this.copyToClipboard(this.state.password)}>
              Copy Password
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="password-length">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-4">Password Length</div>
                  <div className="col-4">{this.state.password_length}</div>
                  <div className="col-4"><input type="range" min="1" max="100" value={this.state.password_length} onChange={e=>{this.setState({password_length:e.target.value}, ()=>this.generatePassword());}} /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="A-TO-Z">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-6">A-Z</div>
                  <div className="col-6"><input type="checkbox" defaultChecked={this.state.A_Z} onChange={e=>{this.setState({A_Z: !this.state.A_Z}, ()=>this.generatePassword());}}/></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="a-to-z">
              <div className="container-fluid">
                  <div className="row">
                    <div className="col-6">a-z</div>
                    <div className="col-6"><input type="checkbox"  defaultChecked={this.state.a_z} onChange={e=>{this.setState({a_z: !this.state.a_z}, ()=>this.generatePassword());}}/></div>
                  </div>
                </div>
              </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="n0-to-9">
              <div className="container-fluid">
                  <div className="row">
                    <div className="col-6">0-9</div>
                    <div className="col-6"><input type="checkbox"  defaultChecked={this.state.n0_9} onChange={e=>{this.setState({n0_9: !this.state.n0_9}, ()=>this.generatePassword());}}/></div>
                  </div>
                </div>
              </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="special-characters">
              <div className="container-fluid">
                  <div className="row">
                    <div className="col-6">!@#$%^&*()</div>
                    <div className="col-6"><input type="checkbox" defaultChecked={this.state.special_chars} onChange={e=>{this.setState({special_chars: !this.state.special_chars},()=>this.generatePassword());}}/></div>
                  </div>
                </div>
              </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="minimum-numbers">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-6">Minimum Numbers</div>
                  <div className="col-6"><input type="number" value={this.state.minimum_numbers} min={0} max={this.state.password_length} onChange={e=>{this.setState({minimum_numbers:e.target.value}, ()=>this.generatePassword());}} /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="minimum-special-characters">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-6">Minimum Special</div>
                  <div className="col-6"><input type="number"  value={this.state.minimum_special} min={0} max={this.state.password_length} onChange={e=>{this.setState({minimum_special:e.target.value},()=>this.generatePassword());}} /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
}
 
export default App;