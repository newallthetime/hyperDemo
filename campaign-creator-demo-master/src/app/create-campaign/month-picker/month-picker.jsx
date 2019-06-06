import React from 'react';
import './month-picker.scss';

class MonthPicker extends React.Component {
  constructor(props) {
    super(props);
    const months = [
      { display: 'Jan', name: 'January', numeric: '01' },
      { display: 'Feb', name: 'February', numeric: '02' },
      { display: 'Mar', name: 'March', numeric: '03' },
      { display: 'Apr', name: 'April', numeric: '04' },
      { display: 'May', name: 'May', numeric: '05' },
      { display: 'June', name: 'June', numeric: '06' },
      { display: 'July', name: 'July', numeric: '07' },
      { display: 'Aug', name: 'August', numeric: '08' },
      { display: 'Sep', name: 'September', numeric: '09' },
      { display: 'Oct', name: 'October', numeric: '10' },
      { display: 'Nov', name: 'November', numeric: '11' },
      { display: 'Dec', name: 'December', numeric: '12' }
    ];

    let selectedYear;
    let selectedMonth;
    if (props.selectedDate && props.selectedDate !== 'No end month') {
      const splitYearOrDate = props.selectedDate.split(',');
      if (splitYearOrDate.length > 1) {
        selectedYear = +splitYearOrDate[1].trim();
        const monthName = splitYearOrDate[0].trim();
        selectedMonth = months.find((month => month.name === monthName));
      } else {
        selectedYear = +splitYearOrDate[0].trim();
        selectedMonth = {};
      }
    } else {
      selectedYear = new Date().getFullYear();
      selectedMonth = {};
    }

    this.state = {
      months,
      selectedYear,
      selectedMonth
    }

    this.incrementYear = this.incrementYear.bind(this);
    this.decrementYear = this.decrementYear.bind(this);
    this.selectMonth = this.selectMonth.bind(this);
    this.selectOngoing = this.selectOngoing.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.timePeriod = this.props.end ? 'end' : 'start';
    this.currentYear = new Date().getFullYear();
    this.currentMonthIdx = new Date().getMonth();
  }
  
  componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  incrementYear(e) {
    e.preventDefault();
    let selectedYear = this.state.selectedYear;
    selectedYear++;
    this.setState({ selectedYear }, () => {
      this.props.handleSelect(`${this.state.selectedMonth.name ? this.state.selectedMonth.name + ', ' : ''}${this.state.selectedYear}`);
    });
  }

  decrementYear(e) {
    e.preventDefault();
    let selectedYear = this.state.selectedYear;
    if (selectedYear > this.currentYear) {
      selectedYear--;
      this.setState({ selectedYear }, () => {
        this.props.handleSelect(`${this.state.selectedMonth.name ? this.state.selectedMonth.name + ', ' : ''}${this.state.selectedYear}`);
      });
    }
  }

  selectMonth(selectedMonth, i) {
    if (this.isMonthIndexInvalid(i)) {
      return;
    }
    this.setState({ selectedMonth }, () => {
      this.props.handleSelect(`${selectedMonth.name}, ${this.state.selectedYear}`);
    });
  }

  isMonthIndexInvalid(i) {
    return this.state.selectedYear === this.currentYear && i < this.currentMonthIdx;
  }

  selectOngoing() {
    this.props.handleSelect('No end month')
  }

  handleClick(e) {
    if (!this.node || this.node.contains(e.target)) {
      return;
    }

    this.handleClickOutside();
  }

  handleClickOutside() {
    this.props.close(this.timePeriod);
  }

  renderMonths() {
    return this.state.months.map((month, i) => (
      <div key={i} className={`month ${this.state.selectedMonth.name === month.name ? 'selected' : ''} ${this.isMonthIndexInvalid(i) ? 'disabled' : ''}`} onClick={(e) => this.selectMonth(month, i)}><span>{month.display}</span></div>
    ));
  }

  render() {
    return (
      <div ref={node => this.node = node} className="calendar-wrapper">
        <div className="year-select">
          <div className={`triangle left ${this.state.selectedYear === this.currentYear ? 'disabled': ''}`} onClick={this.decrementYear}></div>
          <div className="selected-year">{this.state.selectedYear}</div>
          <div className="triangle right" onClick={this.incrementYear}></div>
        </div>

        { this.props.end ? <div className="no-end" onClick={() => this.selectOngoing()}>
          Ongoing (no end month)
        </div> : null }

        <div className="months-container">
          {this.renderMonths()}
        </div>
      </div>
    );
  }
}

export default MonthPicker;