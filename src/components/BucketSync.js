import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { animateScroll } from 'react-scroll';
// import { PropagateLoader } from 'react-spinners';

const fixPath = window.require('fix-path');
const spawn = window.require('child_process').spawn;

class BucketSync extends Component {
  constructor(props) {
    super(props);
    this.state = {
      consoleOutput: [],
      downloading: false
    };
  }
  
  scrollToBottom() {
    animateScroll.scrollToBottom({
      containerId: "consoleOutput"
    });
  }
  
  showDownloadButton() {
    return this.state.downloading || !this.props.selectedBucket || !this.props.downloadDirectory.length;
  }
  
  syncBucket(syncType) {
    this.toggleDownloadState();
    
    // TODO: Killing the app should kill this process
    // TODO: Conditionally use s3 SDK or CLI depending on user config - https://www.npmjs.com/package/electron-config
    fixPath();
    var startMessage = `Starting ${syncType} - ${this.props.selectedBucket.name}`;
    this.updateConsoleOutput(startMessage);
    
    var _this = this;
    var syncArgs = [];
    if(syncType === 'download'){
      syncArgs = ['s3', 'sync', `s3://${this.props.selectedBucket.name}`, `${this.props.downloadDirectory}`];
    } else if(syncType === 'upload') {
      syncArgs = ['s3', 'sync', `${this.props.downloadDirectory}`, `s3://${this.props.selectedBucket.name}`];
    }
    
    var sync = spawn('aws', syncArgs);
    
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
      _this.toggleDownloadState();
      console.log('child process exited with code ' + code.toString());
    });
  }
  
  parseCode(code) {
    var parsedCode = 'Failure';
    
    if(code === 0) {
      parsedCode = 'Transfer complete.';
    }
    
    return parsedCode;
  }
  
  toggleDownloadState(){
    this.setState({downloading:!this.state.downloading});
  }
  
  updateConsoleOutput(output) {
    var newArray = this.state.consoleOutput.slice();    
    newArray.push(output.toString());   
    this.setState({consoleOutput:newArray}, this.scrollToBottom());
  }
  
  render() {
    var consoleOutput = this.state.consoleOutput.map(function(item) {
      return (
        <li key={item}>{item}</li>
      );
    });
    
    return (
      <div>
        <div className="row bottom-buffer">
          <div className="col-md-4 text-left">
            <Button onClick={() => this.syncBucket('download')} disabled={this.showDownloadButton()}>Download Bucket</Button>
          </div>
        </div>
        
        <div id="consoleOutput" className="container-fluid consoleOutput">
          <ul>{consoleOutput}</ul>
        </div>
      </div>
    );
  }
}

export default BucketSync;