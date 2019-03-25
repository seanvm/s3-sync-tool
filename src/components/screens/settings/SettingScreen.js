import React, { Component } from 'react';

import Notifications from '../../../components/Notifications';
import UserInfo from './UserInfo';
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
        <UserInfo />
      </div>
    );
  }
}

export default SettingScreen;
