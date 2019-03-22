import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faCloudDownloadAlt, faHistory, faCogs } from '@fortawesome/free-solid-svg-icons'

export default class NavigationBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  render() {
    return (
      <div className="sticky-top justify-content-center" id="">
        <div className="selected row align-items-center navigation-item">
          <div className="col">
            <div className="row align-items-center justify-content-center">
              <FontAwesomeIcon icon={faCloudDownloadAlt} size="2x" />
            </div>
            <div className="row align-items-center justify-content-center">
              Buckets 
            </div>
          </div>
        </div>
        <div className="row align-items-center navigation-item">
          <div className="col">
            <div className="row align-items-center justify-content-center">
              <FontAwesomeIcon icon={faHistory} size="2x" />
            </div>
            <div className="row align-items-center justify-content-center">
              History
            </div>
          </div>
        </div>
        <div className="row align-items-center navigation-item">
          <div className="col">
            <div className="row align-items-center justify-content-center">
              <FontAwesomeIcon icon={faCogs} size="2x" />
            </div>
            <div className="row align-items-center justify-content-center">
              Settings 
            </div>
          </div>
        </div>
      </div>
    );
  }
}