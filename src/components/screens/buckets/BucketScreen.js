import React, { Component } from 'react';
import BucketSelector from './BucketSelector';
import DownloadDirectorySelector from './DownloadDirectorySelector';
import BucketSync from './BucketSync';
import Notifications from '../../../components/Notifications';
import BucketStats from './BucketStats';

class BucketScreen extends Component {
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
      <div className="buckets">
        <Notifications alertMessage={this.state.alertMessage} handleAlertMessage={this.handleAlertMessage} />
        <h1>Buckets</h1>
        <BucketSelector onSelectBucket={this.handleBucket} />
        <BucketStats selectedBucket={this.state.selectedBucket} />
        <DownloadDirectorySelector onSelectDirectory={this.handleDirectorySelection} />
        <BucketSync selectedBucket={this.state.selectedBucket} downloadDirectory={this.state.downloadDirectory} handleAlertMessage={this.handleAlertMessage} />
      </div>
    );
  }
}

export default BucketScreen;
