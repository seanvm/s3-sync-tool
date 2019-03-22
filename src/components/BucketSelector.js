import React, { Component } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import Bucket from '../models/Bucket.js';

// import { PropagateLoader } from 'react-spinners';

const execAsync = window.require('async-child-process').execAsync;
const fixPath = window.require('fix-path');

class BucketSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buckets: [],
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
    fixPath();
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
  
  render() {
    var bucketOptions = this.state.buckets.map(function(item) {
      return (
        <option key={item.name + item.dateModified} value={item.name}>{item.name}</option>
      );
    });
    
    return (
      <div className="container-fluid">
        <FormGroup>
          <Label for="exampleSelect">Select A Bucket</Label>
          <Input type="select" name="select" id="exampleSelect" onChange={this.handleBucketChange}>
            <option value="" disabled selected>{this.state.loading ? 'Loading...' : 'Select an S3 bucket'}</option>
            {bucketOptions}
          </Input>
        </FormGroup>
      </div>
    );
  }
}

export default BucketSelector;
