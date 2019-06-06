import React from 'react';
import './create-campaign.scss';
import settingsIcon from '../../assets/images/Setting-Icon.png';
import locationIcon from '../../assets/images/Location-Icon.png';
import targetIcon from '../../assets/images/Targeting-Icon.png';
import infoIcon from '../../assets/images/Info-Icon.png';
import map from '../../assets/images/map.svg';
import SegmentSelectContainer from './segment-select-container/segment-select-container';
import MonthPicker from './month-picker/month-picker';  
import Axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import campaignsTable from '../campaigns-table/campaigns-table';

class CreateCampaign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      startMonth: '',
      endMonth: '',
      budget: '',
      landingPage: '',
      zipCode: '',
      segments: [
        { name: 'Retirement Planning', selected: false },
        { name: 'Divorce', selected: false },
        { name: '401k', selected: false },
        { name: 'Charity', selected: false }
      ],
      showSegmentSelect: false,
      showStartPicker: false,
      showEndPicker: false
    }

    this.updateFormField = this.updateFormField.bind(this);
    this.addOrRemoveSegment = this.addOrRemoveSegment.bind(this);
    this.removeSegment = this.removeSegment.bind(this);
    this.toggleSegmentSelect = this.toggleSegmentSelect.bind(this);
    this.openMonthPicker = this.openMonthPicker.bind(this);
    this.closeMonthPicker = this.closeMonthPicker.bind(this);
    this.updateStartMonth = this.updateStartMonth.bind(this);
    this.updateEndMonth = this.updateEndMonth.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // make cancel reset everything
  resetForm() {
    this.setState({
      name: '',
      startMonth: '',
      endMonth: '',
      budget: '',
      landingPage: '',
      zipCode: '',
      segments: [
        { name: 'Retirement Planning', selected: false },
        { name: 'Divorce', selected: false },
        { name: '401k', selected: false },
        { name: 'Charity', selected: false }
      ],
      showSegmentSelect: false,
      showStartPicker: false,
      showEndPicker: false
    });
  }

  toggleSegmentSelect(e) {
    e.preventDefault();
    this.setState({showSegmentSelect: !this.state.showSegmentSelect});
  }

  removeSegment(segment) {
    const segments = [...this.state.segments];
    const index = segments.findIndex((seg) => seg.name === segment.name);
    if (segments[index]) {
      segments[index].selected = false;
      this.setState({ segments });
    }
  }

  addOrRemoveSegment(index) {
    const segments = [...this.state.segments];
    const segment = segments[index];
    segment.selected = !segment.selected;
    this.setState({ segments });
  }

  renderSelectedSegments() {
    return this.state.segments
      .filter(segment => segment.selected)
      .map((segment, i) => (
        <div key={i} className="segment" onClick={(e) => this.removeSegment(segment)}>{segment.name}</div>
      ));
  }

  updateFormField(field) {
    return (e) => this.setState({[field]: e.currentTarget.value});
  }

  openMonthPicker(timePeriod) {
    const stateProp = timePeriod === 'start' ? 'showStartPicker' : 'showEndPicker';

    this.setState({
      [stateProp]: true
    });   
  }

  closeMonthPicker(timePeriod) {
    const stateProp = timePeriod === 'start' ? 'showStartPicker' : 'showEndPicker';

    this.setState({
      [stateProp]: false
    });   
  }
  
  updateStartMonth(startMonth) {
    this.setState({ startMonth });
  }

  updateEndMonth(endMonth) {
    this.setState({ endMonth })
  }

  onSubmit(e) {
    e.preventDefault();
    const campaign_test_form = {
      name: this.state.name,
      startMonth: this.state.startMonth,
      endMonth: this.state.endMonth,
      budget: this.state.budget,
      landingPage: this.state.landingPage,
      zipCode: this.state.zipCode,
      segments: this.state.segments.filter((segment) => segment.selected)
    }
    console.log(campaign_test_form);
    Axios.post('http://localhost:3000/create', campaign_test_form)
      .then(res => console.log(res.data));
  }

  render() {
    return (
      <div>
        <form className="page-wrapper">
          <div className="campaign-container">
            <header className="text">
              <h1>Create Campaign</h1>
              <span onClick={this.resetForm}>Cancel</span>
            </header>

            <section>
              <header>
                <img src={settingsIcon} alt="settings" />
                <h2>Settings</h2>
              </header>

              <div>
                <label>
                  Campaign Name
                  <input placeholder={'Example: The Harbor East Group Display'} className="campaign-name" type="text" onChange={this.updateFormField('name')} value={this.state.name} />
                </label>
              </div>

              <div className="month-controls">
                <label>
                  Start month
                  {this.state.showStartPicker ? <MonthPicker selectedDate={this.state.startMonth} handleSelect={this.updateStartMonth} close={this.closeMonthPicker}/> : null}
                  <input className="month-picker first" type="text" onClick={(e) => this.openMonthPicker('start')} value={this.state.startMonth} readOnly={true} />
                </label>

                <label>
                  End month
                  {this.state.showEndPicker ? <MonthPicker selectedDate={this.state.endMonth} handleSelect={this.updateEndMonth} close={this.closeMonthPicker} end={true} /> : null}
                  <input className="month-picker" type="text" onClick={(e) => this.openMonthPicker('end')} value={this.state.endMonth} readOnly={true} />
                </label>              
              </div>
            
              <div className="budget-controls">
                Budget
                <div className="radio-container">
                  <label>
                    <input className="radio" type="radio" name="budget" value="500"/>
                    $ 500 / month
                  </label>

                  <label>
                    <input className="radio" type="radio" name="budget" value="500"/>
                    $ 800 / month
                  </label>

                  <label>
                    <input className="radio" type="radio" name="budget" value="500"/>
                    $ 1000 / month
                  </label>                                
                </div>
              </div>

              <div>
                <label>
                  Landing Page for Ad Traffic
                  <input placeholder={'Example: harboreastgroup.com/contact'} onChange={this.updateFormField('landingPage')}  className="campaign-name" type="text" value={this.state.landingPage} />
                </label>
              </div>            

              <aside className="instructions">
                <div className="instruction-item first">
                  <img src={infoIcon} alt="info" />
                  <div className="info-text">
                    Your campaign will begin on the first of the start month and will run through the end 
                    month. Your campaign must run for at least 6 months. If your campaign has no end 
                    month, it will be ongoing. You can terminate your campaign any time. 
                  </div>
                </div>

                <div className="instruction-item">
                  <img src={infoIcon} alt="info" />
                  <div className="info-text">
                    These budget options have been selected to optimize performance at different levels
                    of spend. The higher the monthly budget, the faster campaigns will be optimized for 
                    performance, increasing clicks.
                  </div>
                </div>
              </aside>
            </section>

            <section>
              <header>
                <img src={locationIcon} alt="location" />
                <h2>Location</h2>
              </header>
              <div>
                <label>
                  Zip Code
                  <div className="zip">
                    <input style={{width: '140px'}} type="number" onChange={this.updateFormField('zipCode')} value={this.state.zipCode} />
                    <div className="instruction-item">
                      <img src={infoIcon} alt="info" />
                      <div className="info-text">
                        Morgan Stanley has determined the designated marketing areas to optimize reach and target potential clients most likely to engage with your ads based on your zip code
                      </div>
                    </div>
                  </div>
                </label>
              </div>

              <div className="region-container">
                <img src={map} alt="map"/>
                <div className="regions">
                  Regions included in the designated marketing area:
                  <ul>
                    <li>DMA 1</li>
                    <li>DMA 2</li>
                    <li>DMA 3</li>
                    <li>DMA 4</li>
                    <li>DMA 5</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <header>
                <img src={targetIcon} alt="target" />
                <h2>Targeting</h2>
              </header>

              <div className="field include-message">
                <div style={{position: 'relative'}}>
                  Audience Segments
                  <button onClick={(e) => this.toggleSegmentSelect(e)} className="add-remove">
                    <span>+ add / remove</span>
                    <div className={`triangle ${!this.state.showSegmentSelect ? 'flip' : ''}`}></div>
                  </button>
                  { this.state.showSegmentSelect ? <SegmentSelectContainer addOrRemoveSegment={this.addOrRemoveSegment} close={this.toggleSegmentSelect} segments={this.state.segments}/> : null}
                </div>

                <div className="instruction-item">
                  <img src={infoIcon} alt="info" />
                  <div className="info-text">
                    Morgan Stanley has determined the designated marketing areas to optimize reach and target potential clients most likely to engage with your ads based on your zip code
                  </div>
                </div>              
              </div>

              <div className="field">
                Included
                <div className="segments-container">
                  {this.renderSelectedSegments()}
                </div>
              </div>
            </section>

            <section>
              <header>
                <h2>Creative</h2>
              </header>
            </section>
          </div>
        </form>
        
        
        {/* <Router> */}
          <div className="campaign-footer">
            <div className="left">
              <span className="text">back to campaigns</span>
            </div>
            <div className="right">
              {/* <button className="cancel" onClick={this.resetForm}>Cancel</button> */}
              <Link className="cancel" to={'/campaigns'}  >Cancel</Link>
                {/* <Switch>
                 <Route path='/campaigns' component={campaignsTable} />
               </Switch> */}
              {/* <button className="save" onClick={this.resetForm}>Save Campaign</button> */}
              <button className="save" onClick={this.onSubmit}>Save Campaign</button>
            </div>
          </div>  
        {/* </Router>         */}
      </div>
    );
  }
}

export default CreateCampaign;