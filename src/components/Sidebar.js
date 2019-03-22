import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

export default class NavigationBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  render() {
    return (
      <div className="sticky-top" id="">
        <div className="row align-items-center navigation-item">
          <div className="col">
            Buckets
          </div>
        </div>
        <div className="row align-items-center navigation-item">
          <div className="col">
            History
          </div>
        </div>
        <div className="row align-items-center navigation-item">
          <div className="col">
            Settings
          </div>
        </div>
      </div>
    );
  }
}