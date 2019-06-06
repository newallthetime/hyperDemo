import React from 'react';
import Axios from 'axios';
import TableRow from './tablerow';
import './campaigns-table.scss';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class CampaignsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { campaigns: []};
  }

  componentDidMount(){
    Axios.get('http://localhost:3000/campaigns')
    .then(response => {
      this.setState({ campaigns: response.data });
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  tabRow(){
    return this.state.campaigns.map(function(object, i){
        return <TableRow obj={object} key={i} />;
    });
  }

  render() {
    // const {campaigns} = this.state;
    return (
      <section>

       
        <div className="cards-container">
          {/* <div className="cards-area"> */}
            <div className="card1">Card1</div>
            <div className="card1">Card2</div>
            <div className="card1">Card2</div>
          {/* </div> */}
        </div>
      

        <div className="create-container">
          <div className="create-area">
          <Link className="create-button" to={'/create'}>Create Campaign</Link>
          </div>
        </div>
      
        
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th scope="column" className="th-campaign">Campaign</th>
                  <th scope="column" className="th-other">Active</th>
                  <th scope="column" className="th-other">Budget</th>
                  <th scope="column" className="th-other">Flight Dates</th>
                  <th scope="column" className="th-other">Segment</th>
                  <th scope="column" className="th-other">DMA</th>
                </tr>
              </thead>
              <tbody>
                {this.tabRow()}
              </tbody>
            </table>
          </div>
      </section>
      // <div style={{paddingTop: 50, paddingLeft: 100}}>
      //   {campaigns.map(camp => <div>name: {camp.name}</div>)}
      // </div>
    )
  }
};

export default CampaignsTable;