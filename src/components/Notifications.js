import React, { Component } from 'react';
import { Alert } from 'reactstrap';

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertVisible: false,
      alertMessage: ''
    };
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.alertMessage !== this.props.alertMessage){
      this.setState({ alertMessage: nextProps.alertMessage }, () => { 
        this.showAlert();
      });
    }
  }
    
  showAlert = ()=>{
    this.setState({alertVisible:true}, () => {
      window.setTimeout(()=>{
        this.setState({alertVisible:false, alertMessage: ''})
      },3000)
    });
  }
  
  render() { 
    return (
      <div>
        <Alert color="info" isOpen={this.state.alertVisible} >
          {this.state.alertMessage}
        </Alert>
      </div>
    );
  }
}

export default Notifications;
