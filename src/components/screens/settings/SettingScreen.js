import React, { Component } from 'react';

import Notifications from '../../../components/Notifications';
import { BarLoader } from 'react-spinners';

class SettingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() { 
    return (
      <div className="screen" id="settings">
        <Notifications alertMessage={this.state.alertMessage} handleAlertMessage={this.handleAlertMessage} />
        <h1>Settings (Coming Soon!)</h1>
        
        
        <div className="section p-3 mb-3">
        <div className="d-flex-col">
          <h2>AWS Creds</h2>
          <div>
            <BarLoader
              loading={true}
            />
          </div>
        </div>
      </div>
        
      </div>
    );
  }
}

export default SettingScreen;
