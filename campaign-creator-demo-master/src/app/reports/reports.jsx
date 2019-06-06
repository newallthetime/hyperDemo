import React from 'react';
import './reports.scss';
import AdvisorStatsContainer from '../advisor-stats/advisor-stats';
import AdvisorStatsChartContainer from '../advisor-stats-chart/advisor-stats-chart';

class Reports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAdvisorStats: false
    }
    this.toggleAdvisorStats = this.toggleAdvisorStats.bind(this);
  }

  toggleAdvisorStats(e) {
    e.preventDefault();
    this.setState({showAdvisorStats: !this.state.showAdvisorStats});
  }

  render() {
    return (
      <div>
        <div className="reports-page-wrapper">
          <div className="reports-container">
            <header className="text">
              <h1>Reports</h1>
            </header>
            {/* <button className="add-remove"> */}
            <button onClick={(e) => this.toggleAdvisorStats(e)} className="add-remove">
              <span>Advisors</span>
            </button>
            { this.state.showAdvisorStats ? <AdvisorStatsChartContainer/> : null}
            <button className="add-remove">
              <span>Segments</span>
            </button>
            <button className="add-remove">
              <span>URL's</span>
            </button>
          </div>
        </div>
      </div>    
    );
  }
}  

export default Reports;