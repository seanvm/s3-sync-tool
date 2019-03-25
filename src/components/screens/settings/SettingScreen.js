import React, { Component } from 'react';

class BucketScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBucket: '',
      downloadDirectory: '',
      selectedTab: 'settings'
    };
  }

  render() { 
    return (
      <div className="settings">
        Settings coming soon!
      </div>
    );
  }
}

export default BucketScreen;
