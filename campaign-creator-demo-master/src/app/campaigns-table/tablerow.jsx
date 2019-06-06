import React, { Component } from 'react';
import './campaigns-table.scss'

class TableRow extends Component {
  render() {
    return (
        <tr>
          <td className="td">
            {this.props.obj.name}
          </td>
          <td className="td">
            {this.props.obj.startMonth}
          </td>
          <td className="td">
            {this.props.obj.endMonth}
          </td>
          <td>
            <button className="btn btn-primary">Edit</button>
          </td>
          <td>
            <button className="btn btn-danger">Report</button>
          </td>
        </tr>
    );
  }
}

export default TableRow;