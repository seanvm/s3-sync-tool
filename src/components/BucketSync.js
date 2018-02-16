import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { animateScroll } from 'react-scroll';
// import { PropagateLoader } from 'react-spinners';

const fixPath = window.require('fix-path');
const spawn = window.require('child_process').spawn;

class BucketSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      consoleOutput: [],
      loading: true
    };
  }
  
  scrollToBottom() {
    animateScroll.scrollToBottom({
      containerId: "consoleOutput"
    });
  }
  
  showDownloadButton() {
    return (this.props.selectedBucket.length && this.props.downloadDirectory.length) > 0;
  }
  
  downloadBucket() {
    // TODO: Killing the app should kill this process
    // TODO: Conditionally use s3 SDK or CLI depending on user config - https://www.npmjs.com/package/electron-config
    // TODO: https://github.com/atom/node-keytar - look into this for key storage
    fixPath();
    var startMessage = `Starting Download from ${this.props.selectedBucket}`;
    this.updateConsoleOutput(startMessage);
    
    var sync = spawn('aws', ['s3', 'sync', `s3://${this.props.selectedBucket}`, `${this.props.downloadDirectory}`]);
    var _this = this;
    
    sync.stdout.on('data', function(data) {
      _this.updateConsoleOutput(data);
      console.log('stdout: ' + data.toString());
    });
    
    sync.stderr.on('data', function(data) {
      _this.updateConsoleOutput(data);
      console.log('stderr: ' + data.toString());
    });
    
    sync.on('exit', function (code) {
      var parsedCode = _this.parseCode(code);
      _this.updateConsoleOutput(parsedCode);
      console.log('child process exited with code ' + code.toString());
    });
  }
  
  parseCode(code) {
    var parsedCode = 'Failure';
    
    if(code == '0') {
      parsedCode = 'Bucket Up To Date';
    }
    
    return parsedCode;
  }
  
  updateConsoleOutput(output) {
    var newArray = this.state.consoleOutput.slice();    
    newArray.push(output.toString());   
    this.setState({consoleOutput:newArray}, this.scrollToBottom());
  }
  
  render() {
    var consoleOutput = this.state.consoleOutput.map(function(item) {
      return (
        <li>{item}</li>
      );
    });
    
    return (
      <div>
        <div className="row bottom-buffer">
          <div className="col-md-4 text-left">
            <Button onClick={() => this.downloadBucket()} disabled={!this.showDownloadButton()}>Download Bucket</Button>
          </div>
        </div>
        
        <div id="consoleOutput" className="container-fluid consoleOutput">
          <ul>{consoleOutput}</ul>
        </div>
      </div>
    );
  }
}

export default BucketSelector;
