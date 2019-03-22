import React, { Component } from 'react';
import BucketSelector from './components/BucketSelector';
import BucketSync from './components/BucketSync';
import Notifications from './components/Notifications';
import Sidebar from './components/Sidebar';
import { Button } from 'reactstrap';
import './App.css';
import BucketStats from './components/BucketStats';

const remote = window.require('electron').remote;

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
  
  handleAlertMessage = (message) => {
    this.setState({alertMessage: message})
  }

  selectDirectory() {
    var _this = this;
    remote.dialog.showOpenDialog({ 
      properties: [ 'openDirectory' ] }, function (directory) {
        if(typeof directory !== 'undefined') {
          _this.setState({downloadDirectory: directory.toString()});
        }
      }
    );
    console.log(this.state.downloadDirectory);
  }
  
  render() { 
    return (
      <div className="container-fluid h-100">
        <div className="row h-100">
          <div className="sidebar col-2 col-lg-1 col-xs-6 px-1 position-fixed h-100">
            <Sidebar />
          </div>

          <div className="main col offset-2 offset-lg-1 offset-xs-6 h-100">
            <Notifications alertMessage={this.state.alertMessage} />
            <BucketSelector onSelectBucket={this.handleBucket} />
            <div className="container-fluid">
              <div className="row bottom-buffer">
                <div className="col-md-4 text-left">
                  <Button onClick={() => this.selectDirectory()}>Choose Download Directory</Button>{' '}
                </div>
                
                <div className="col-md-4 text-left">
                  {this.state.downloadDirectory.length ? `Current Directory: ${this.state.downloadDirectory}` : 'No Directory Selected'}
                </div>
              </div>
              <BucketStats selectedBucket={this.state.selectedBucket} />
              
              <BucketSync selectedBucket={this.state.selectedBucket} downloadDirectory={this.state.downloadDirectory} handleAlertMessage={this.handleAlertMessage} />
            
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
