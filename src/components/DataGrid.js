import React from 'react';
import ReactDataGrid from 'react-data-grid';
import { ProgressBar } from 'react-bootstrap';
import '../App.css';

const ProgressBarFormatter = ({ value }) => <ProgressBar now={value} label={`${value}%`} />;

const columns = [
  { key: 'id', name: 'ID', editable: true },
  { key: 'title', name: 'Title', editable: true },
  {
    key: 'complete', name: 'Complete', formatter: ProgressBarFormatter, editable: true,
  },
];

const rows = [
  { id: 0, title: 'Task 1', complete: 20 },
  { id: 1, title: 'Task 2', complete: 40 },
  { id: 2, title: 'Task 3', complete: 60 },
];

class DataGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rows };
    this.onGridRowsUpdated = this.onGridRowsUpdated.bind(this);
  }

  onGridRowsUpdated({ fromRow, toRow, updated }) {
    this.setState(state => {
      const rows = state.rows.slice();
      for (let i = fromRow; i <= toRow; i += 1) {
        rows[i] = { ...rows[i], ...updated };
      }
      return { rows };
    });
  }

  render() {
    const { rows } = this.state;
    return (
      <ReactDataGrid
        columns={columns}
        // rows={rows}
        rowGetter={i => rows[i]}
        rowsCount={rows.length}
        onGridRowsUpdated={this.onGridRowsUpdated}
        enableCellSelect
      />
    );
  }
}

export default DataGrid;
