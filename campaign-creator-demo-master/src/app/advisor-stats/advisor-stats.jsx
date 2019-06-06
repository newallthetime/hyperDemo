import React from 'react';
import './advisor-stats.scss';
import axios from 'axios';

class AdvisorStatsContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = { advisorstats: [] };
  }
 
  componentDidMount(){
    axios.get('http://localhost:3000/')
    .then(response => {
      this.setState({ advisorstats: response.data});
      // this.setState(response.data)
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  render() {
    const {advisorstats} = this.state;
    // const {advisor_info} = advisorstats.map(stat => stat._id)
    return (
      <div>
        <div className="advisor-stats-wrapper">
          <div className="advisor-stats-container">
            {/* <header className="text"> */}
              {advisorstats.map(stat => <div className="text">id: {stat._id} impressions: {stat.impressionsTotal} clicks: {stat.clicksTotal}</div>)}
            {/* </header> */}
          </div>
        </div> 
      {/* // <div className="advisor-stats-wrapper">
      //   {this.state.advisorstats}
      //   {advisorstats.map(advisor => <div>{advisor._id}</div>)} */}
      </div>
    );
  }
};

export default AdvisorStatsContainer;


