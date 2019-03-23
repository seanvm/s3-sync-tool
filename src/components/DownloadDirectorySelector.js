import React, { Component } from 'react';
import { Button } from 'reactstrap';
import SuccessBadge from './badges/SuccessBadge.js'

const remote = window.require('electron').remote;

class DownloadDirectorySelector extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      downloadDirectory: ''
    };
  }
 

  
  selectDirectory() {
    var _this = this;
    remote.dialog.showOpenDialog({ 
      properties: [ 'openDirectory' ] }, function (directory) {
        if(typeof directory !== 'undefined') {
          _this.setState({downloadDirectory: directory.toString()})
          _this.props.onSelectDirectory(directory.toString());
        }
      }
    );
    console.log(this.state.downloadDirectory);
  }
  

  render() {
    return (
      <div className="section mb-3 p-3">
        <div className="d-flex align-items-center">
          <Button color="primary" className="mr-5" onClick={() => this.selectDirectory()}>Choose Download Directory</Button>{' '}
          <span>
            {this.state.downloadDirectory.length ? `Current Directory: ${this.state.downloadDirectory}` : 'No Directory Selected'}
            
            <SuccessBadge show={!!this.state.downloadDirectory.length}  />
          </span>
        </div>
      </div>
    );
  }
}

export default DownloadDirectorySelector;
