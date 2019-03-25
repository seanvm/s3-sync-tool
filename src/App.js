import React, { Component } from 'react';
import Sidebar from './components/Sidebar';
import BucketScreen from './components/screens/buckets/BucketScreen';
import SettingScreen from './components/screens/settings/SettingScreen';
import './App.css';

const fixPath = window.require('fix-path');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: '',
    };
  }
  
  componentWillMount() {
    fixPath(); // Seems to block UI render of components.
  }
  
  handleNavigation = (selectedTab) => {
    this.setState({selectedTab});
  }
  
  // TODO: Use react router for this
  getCurrentScreen() {
    let screen
    
    switch (this.state.selectedTab) {
      case 'buckets':
        screen = <BucketScreen />;
        break;
      case 'settings':
        screen = <SettingScreen />;
        break;
      default:
        screen = <BucketScreen />;
        break;
    }
    
    return screen;
  }
  
  render() { 
    return (
      <div className="container-fluid h-100">
        <div className="row h-100">
          <div className="sidebar col-2 col-lg-1 col-xs-6 px-0 position-fixed h-100">
            <Sidebar onNavigation={this.handleNavigation} />
          </div>

          <div className="main col col-lg-11 col-sm-10 offset-2 offset-lg-1 offset-xs-6 h-100">
            {this.getCurrentScreen()}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
