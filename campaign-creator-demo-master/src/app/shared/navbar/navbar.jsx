import React from 'react';
import './navbar.scss';
import logo from '../../../assets/images/Hyperlocology-Logo.png';
import defaultAvatar from '../../../assets/images/avatar.jpg'
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from 'react-router-dom';
import Reports from '../../reports/reports';
import CreateCampaign from '../../create-campaign/create-campaign';
import CampaignsTable from '../../campaigns-table/campaigns-table';

const noMargin = {
  marginRight: 0
};

const NavBar = (props) => (
  <Router>
    <div className="navbar">
      <div className="left">
        <img src={logo} alt="logo"/>
        {/* <div className="nav-element selected">Campaigns</div> */}
        <NavLink className="nav-element" to={'/create'}>New Campaign</NavLink>
        <Link className="nav-element" to={'/campaigns'}>Campaigns</Link>
        <Link className="nav-element" style={noMargin} to={'/reporting'}>Reporting</Link>
      </div>

      <div className="right">
        <div className="user">
          <h1>The Harbor East Group at Morgan Stanley</h1>
          <h2>Sean@harboreastgroup.com</h2>
        </div>
        <img src={defaultAvatar} alt="avatar" />
      </div>
    </div>

    {/* <div className="nav-page-wrapper">  */}
    <div>
      {/* <div className="nav-reports-container"> */}
      <Switch>
        <Route path='/reporting' component={Reports} />
        <Route path='/campaigns' component={CampaignsTable} />
        <Route path='/create' component={CreateCampaign} />
      </Switch>
      {/* </div> */}
    </div>
  </Router>  
)

export default NavBar;