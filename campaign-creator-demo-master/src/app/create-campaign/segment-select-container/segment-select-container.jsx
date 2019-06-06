import React from 'react';
import './segment-select-container.scss';
import check from '../../../assets/images/check.svg'

class SegmentSelectContainer extends React.Component {

  renderSegmentSelects() {
    return this.props.segments.map((segment, i) => ( 
      <div className="segment-select" key={i} onClick={() => this.props.addOrRemoveSegment(i)}>
        <div className={`check`}>
          {segment.selected ? <img src={check} alt="check" /> : null}
        </div>
        <div className={`segment-item ${segment.selected ? 'selected' : ''}`}>{segment.name}</div>
      </div>
    ));  
  }
 
  render() {  

    return (
      <div className="segment-select-wrapper">
        {this.renderSegmentSelects()}
        
        <div className="done-container">
          <button className="done" onClick={this.props.close}>Done</button>
        </div>
      </div>
    );
  }
}

export default SegmentSelectContainer;