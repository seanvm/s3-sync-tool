import React, { Component } from 'react';
import { BarLoader } from 'react-spinners';

const execAsync = window.require('async-child-process').execAsync;

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      user: {}
    };
  }
  
  componentDidMount() {
    this.getUserInfo();
  }

  
  getUserInfo() {
    this.setState({loading: true});
    execAsync(`aws iam get-user`).then(results => {
      this.setState({user: JSON.parse(results.stdout.toString()).User, loading: false}, () => (
        console.log(this.state)
      ))
    });
  }
 
  
  render() {
    return (
      <div className="section p-3 mb-3">
        <div className="d-flex-col">
          <h2>AWS User Info</h2>
          <div>
            <BarLoader
              loading={this.state.loading}
            />
            { !this.state.loading &&
              <ul>
                <li>User Name: {this.state.user.UserName}</li>
                <li>User Id: {this.state.user.UserId}</li>
              </ul>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default UserInfo;
