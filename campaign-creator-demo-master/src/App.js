import React from 'react';

import './App.css';
import NavBar from './app/shared/navbar/navbar';
import CreateCampaign from './app/create-campaign/create-campaign';
import Reports from './app/reports/reports';
// import AdvisorStats from './app/advisor-stats/advisor-stats';
import AdvisorStatsChart from './app/advisor-stats-chart/advisor-stats-chart'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      {/* <CreateCampaign /> */}
      {/* <Reports /> */}
      {/* <AdvisorStats /> */}
      {/* <AdvisorStatsChart /> */}
    </BrowserRouter>  
  );
}

export default App;
