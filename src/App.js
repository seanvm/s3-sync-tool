import React, { Component } from 'react';
import BucketSelector from './components/BucketSelector';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import logo from './logo.svg';
import './App.css';

const remote = window.require('electron').remote;
const execAsync = window.require('async-child-process').execAsync;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBucket: '',
      downloadDirectory: ''
    };
  }
  
  handleBucket = (bucket) => {
    this.setState({selectedBucket: bucket})
  }
  
  selectDirectory() {
    var _this = this;
    remote.dialog.showOpenDialog({ 
      properties: [ 'openDirectory' ] }, function (directory) {
        if(directory !== undefined) {
          _this.setState({downloadDirectory: directory.toString()})
        }
      }
    );
    console.log(this.state.downloadDirectory);
  }
  
  downloadBucket() {
    return execAsync(`aws s3 sync s3://${this.state.selectedBucket} ${this.state.downloadDirectory}`).then(results => {
      console.log(results);  
      // return results.stdout;
    });
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <BucketSelector onSelectBucket={this.handleBucket} />
         
        <div>
          <Button onClick={() => this.selectDirectory()}>Choose Download Directory</Button>{' '}
          <Button onClick={() => this.downloadBucket()} disabled={!this.state.selectedBucket}>Download Bucket</Button>
        </div>
        
        <div>
          
        </div>
      </div>
    );
  }
}

export default App;
