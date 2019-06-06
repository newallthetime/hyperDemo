import React from 'react';
import { render } from 'react-dom';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './advisor-stats-chart.scss';
import axios from 'axios';

class AdvisorStatsChartContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = { advisorstats: [] };
  }
 
  componentDidMount(){
    axios.get('http://localhost:3000/')
    .then(response => {
      this.setState({ advisorstats: response.data});
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  render() {
    const {advisorstats} = this.state;

    var advisorids = [];
    advisorstats.forEach(function(i){
      advisorids.push(i._id)
    });
    var impressions = []
    advisorstats.forEach(function(i){
      impressions.push(i.impressionsTotal)
    });
    var names = []
    advisorids.forEach(function(i){
      names.push(i.full_name)
    });

    const options = {
      // chart: {
      //   type: 'column'
      // },
      title: {
        text: 'March Impressions'
      },
      xAxis: {
        categories: names,
        },
        yAxis: [{	
        }, {
        	opposite: true
        }],
      series: [
        {
          yAxis: 0,
          type: 'column',
          data: impressions,
          name: 'Impressions'
        },
        {
          yAxis: 1,
          type: 'line',
          data: [.13, .14, .09, .10, .12],
          name: 'CTR'
        }
      ]
    };
    // const {advisor_info} = advisorstats.map(stat => stat._id)
    return (
      <div>
        <div className="advisor-stats-wrapper">
          {/* <div className="advisor-stats-container"> */}
            {/* <header className="text"> */}
              {/* {advisorstats.map(stat => <div className="text">id: {stat._id} impressions: {stat.impressionsTotal} clicks: {stat.clicksTotal}</div>)} */}
            {/* </header> */}
          {/* </div> */}
          <div className="advisor-stats-container">
          <HighchartsReact highcharts={Highcharts} options={options} />
          </div>
        </div> 
      {/* // <div className="advisor-stats-wrapper">
      //   {this.state.advisorstats}
      //   {advisorstats.map(advisor => <div>{advisor._id}</div>)} */}
      </div>
    );
  }
};

export default AdvisorStatsChartContainer;


