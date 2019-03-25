import React, { Component } from 'react';
import { FormGroup, Label, Input, Button } from 'reactstrap';
import Bucket from '../../../models/Bucket.js';
// import { PropagateLoader } from 'react-spinners';

const execAsync = window.require('async-child-process').execAsync;
const fixPath = window.require('fix-path');
const remote = window.require('electron').remote;

class BucketSelector extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      buckets: [],
      downloadDirectory: '',
      loading: true
    };
  }
  
  componentDidMount() {
    this.getBuckets();
  }
  
  handleBucketChange = (event) => {
    var selectedBucket = this.state.buckets.find(function(bucket) {
      return bucket.name === event.target.value;
    });
    
    this.props.onSelectBucket(selectedBucket);
  } 
  
  getBuckets() {
    // fixPath(); // Seems to block UI render of components. Might be unnecessary
    return execAsync("aws s3 ls").then(results => {
      return this.parseBuckets(results.stdout);
    });
  }
  
  parseBuckets(bucketString) {
    const buckets = [];
    
    bucketString.split(/\n/).forEach(bucket => {
      buckets.push(new Bucket(bucket));
    });
  
    this.setState({ buckets, loading: false });
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
    var bucketOptions = this.state.buckets.map(function(item) {
      return (
        <option key={item.name + item.dateModified} value={item.name}>{item.name}</option>
      );
    });
    
    return (
      <div className="">
        <FormGroup>
          <Input type="select" name="select" id="bucket-select" onChange={this.handleBucketChange}>
            <option value="" disabled selected>{this.state.loading ? 'Loading...' : 'Select an S3 bucket'}</option>
            {bucketOptions}
          </Input>
        </FormGroup>
      </div>
    );
  }
}

export default BucketSelector;
