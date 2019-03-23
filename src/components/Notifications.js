import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import { CSSTransition } from 'react-transition-group';

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
      },5000)
    });
  }
  
  render() { 
    return (
      <div>
        <CSSTransition
          in={this.state.alertVisible}
          timeout={4000}
          classNames="alert"
          unmountOnExit
        >
          <Alert color="success" isOpen={this.state.alertVisible} >
            {this.state.alertMessage}
          </Alert>
        </CSSTransition>
       
      </div>
    );
  }
}

export default Notifications;
