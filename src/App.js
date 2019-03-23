import React, { Component } from 'react';
import BucketSelector from './components/BucketSelector';
import DownloadDirectorySelector from './components/DownloadDirectorySelector';
import BucketSync from './components/BucketSync';
import Notifications from './components/Notifications';
import Sidebar from './components/Sidebar';
import './App.css';
import BucketStats from './components/BucketStats';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBucket: '',
      downloadDirectory: ''
    };
  }

  handleBucket = (bucket) => {
    this.setState({selectedBucket: bucket});
  }
  
  handleAlertMessage = (message) => {
    this.setState({alertMessage: message});
  }

  handleDirectorySelection = (directory) => {
    this.setState({downloadDirectory: directory});
  }
  
  render() { 
    return (
      <div className="container-fluid h-100">
        <div className="row h-100">
          <div className="sidebar col-2 col-lg-1 col-xs-6 px-1 position-fixed h-100">
            <Sidebar />
          </div>

          <div className="main col col-lg-11 col-sm-10 offset-2 offset-lg-1 offset-xs-6 h-100">
            <div className="buckets">
              <Notifications alertMessage={this.state.alertMessage} handleAlertMessage={this.handleAlertMessage} />
              <h1>Buckets</h1>
              <BucketSelector onSelectBucket={this.handleBucket} />
              <DownloadDirectorySelector onSelectDirectory={this.handleDirectorySelection} />
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
