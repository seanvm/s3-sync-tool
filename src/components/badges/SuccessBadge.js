import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { CSSTransition } from 'react-transition-group';

class SuccessBadge extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    };
  }
  
  componentWillReceiveProps(nextProps) {
    if(nextProps.show !== this.props.show){
      this.setState({ show: nextProps.show });
    }
  }

  render() {
    return (
      <div className="d-inline-flex">
        <CSSTransition
          in={this.state.show}
          timeout={4000}
          classNames="alert"
          unmountOnExit
        >
          <span className="ml-1"><FontAwesomeIcon icon={faCheckCircle} size="1x" /></span>
        </CSSTransition>
      </div>
    );
  }
}

export default SuccessBadge;