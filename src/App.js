import React, { Component } from 'react';
import BucketSelector from './components/BucketSelector';
import BucketSync from './components/BucketSync';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import logo from './logo.svg';
import './App.css';

const remote = window.require('electron').remote;
const fixPath = window.require('fix-path');

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
  
  render() { 
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <BucketSelector onSelectBucket={this.handleBucket} />
        <div className="container-fluid">
          <div className="row bottom-buffer">
            <div className="col-md-4 text-left">
              <Button onClick={() => this.selectDirectory()}>Choose Download Directory</Button>{' '}
            </div>
            
            <div className="col-md-4 text-left"> {
              this.state.downloadDirectory.length ? `Current Directory: ${this.state.downloadDirectory}` : 'No Directory Selected'}
            </div>
          </div>
          
          {/* Download Button + Console output */}
          <BucketSync selectedBucket={this.state.selectedBucket} downloadDirectory={this.state.downloadDirectory} />
        </div>
      </div>
    );
  }
}

export default App;
