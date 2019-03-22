import React, { Component } from 'react';
import { PropagateLoader } from 'react-spinners';

const execAsync = window.require('async-child-process').execAsync;

class BucketStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBucket: '',
      bucketStats: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.selectedBucket !== this.props.selectedBucket){
      this.setState({ selectedBucket: nextProps.selectedBucket }, () => { 
        this.getBucketStats();
      });
    }
  }
  
  getBucketStats() {
    // A different approach:
    // aws cloudwatch get-metric-statistics --namespace AWS/S3 --start-time 2018-02-14T10:00:00 --end-time 2018-02-15T01:00:00 --period 86400 --statistics Average --region us-west-2 --metric-name BucketSizeBytes --dimensions Name=BucketName,Value=pic2snap.com Name=StorageType,Value=StandardStorage
    
    execAsync(`aws s3 ls --summarize --human-readable --recursive s3://${this.props.selectedBucket.name}`).then(results => {
      var parsedBucketStats = this.parseBucketStats(results.stdout);
      let bucket = {...this.state.buckeet};
      
      bucket.size = parsedBucketStats;
      this.setState({selectedBucket: bucket});
    });
  }
  
  parseBucketStats(bucketStats) {
    var stringArray = bucketStats.split('\n\n');
    return stringArray.pop();
  }
  
  render() {
    return (
      <div>
        <div className="row bottom-buffer">
          <div className="col-md-4 text-left">
            Bucket Stats: {this.state.selectedBucket.size}
          </div>
        </div>
      </div>
    );
  }
}

export default BucketStats;
