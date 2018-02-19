import React, { Component } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
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
    this.props.onSelectBucket(event.target.value);
  } 
  
  getBuckets() {
    fixPath();
    return execAsync("aws s3 ls").then(results => {
      return this.parseBuckets(results.stdout);
    });
  }
  
  parseBuckets(bucketString) {
    console.log(bucketString);
    var stringArray = bucketString.split(/(\s+)/);
    var buckets = stringArray.filter(function(element){
      element = element.replace(":", "");
      return !(Date.parse(element) || (element.trim().length === 0) || (element === "\n") || (parseInt(element, 10)));
    });
    var loading = false;
    this.setState({ buckets, loading });
  }
  
  render() {
    var bucketOptions = this.state.buckets.map(function(item) {
      return (
        <option key={item} value={item}>{item}</option>
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
