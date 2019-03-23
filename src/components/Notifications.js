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
        this.setState({alertVisible:false})
      },3000)
    });
  }
  
  render() { 
    return (
      <div>
        <CSSTransition
          in={this.state.alertVisible}
          timeout={{
            appear: 1000,
            enter: 1000,
            exit: 1000,
           }}
          classNames="alert"
          unmountOnExit
        >
          <Alert color="success" >
            {this.state.alertMessage}
          </Alert>
        </CSSTransition>
       
      </div>
    );
  }
}

export default Notifications;
