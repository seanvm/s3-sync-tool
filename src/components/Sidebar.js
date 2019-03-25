import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudDownloadAlt, faHistory, faCogs } from '@fortawesome/free-solid-svg-icons'

export default class NavigationBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: ''
    };
  }
  
  componentDidMount() {
    this.handleNavigation('buckets');
  }
  
  handleNavigation = (selectedTab) => {
    this.setState({selectedTab});
    this.props.onNavigation(selectedTab);
  }

  render() {
    return (
      <div className="w-100 sticky-top justify-content-center" id="">
        <a onClick={() => this.handleNavigation('buckets')}>
          <div className={"w-100 row mx-0 align-items-center navigation-item " + (this.state.selectedTab === 'buckets' && 'selected')}>
            <div className="col">
              
                <div className="row align-items-center justify-content-center">
                  <FontAwesomeIcon icon={faCloudDownloadAlt} size="2x" />
                </div>
                <div className="row align-items-center justify-content-center">
                  Buckets 
                </div>
            </div>
          </div>
        </a>
        {/* <div className={"w-100 row mx-0 align-items-center navigation-item " + (this.state.selectedTab === 'history' && 'selected')}>
          <div className="col">
            <a onClick={() => this.handleNavigation('history')}>
              <div className="row align-items-center justify-content-center">
                <FontAwesomeIcon icon={faHistory} size="2x" />
              </div>
              <div className="row align-items-center justify-content-center">
                History
              </div>
            </a>
          </div>
        </div> */}
        <a onClick={() => this.handleNavigation('settings')}>
          <div className={"w-100 row mx-0 align-items-center navigation-item " + (this.state.selectedTab === 'settings' && 'selected')}>
            <div className="col">
                <div className="row align-items-center justify-content-center">
                  <FontAwesomeIcon icon={faCogs} size="2x" />
                </div>
                <div className="row align-items-center justify-content-center">
                  Settings 
                </div>
            </div>
          </div>
        </a>
      </div>
    );
  }
}