import React, { Component } from 'react';
import BucketSelector from './components/BucketSelector';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBucket: '',
      currentDirectory: ''
    };
  }
  
  handleBucket = (bucket) => {
    this.setState({selectedBucket: bucket})
    console.log(this.state)
  }
  
  render() {
    console.log(__dirname);
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <BucketSelector onSelectBucket={this.handleBucket} />
         
        <div>
          {this.state.selectedBucket}  
        </div>
      </div>
    );
  }
}

export default App;
