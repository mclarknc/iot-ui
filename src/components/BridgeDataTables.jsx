import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import { Grid, Row } from 'react-flexbox-grid';
import DataTables from 'material-ui-datatables'
import TextField from 'material-ui/TextField';
import {
  Table, TableBody, TableHeader,
  TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class BridgeDataTables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allRows: [],
      displayRows: [],
      startRow: 0,
      rowsToDisplay: this.props.rowsToDisplay,
      rowSizeList: this.props.rowSizeList || [5, 15, 30, 60, 90],
      currentPage: 1,
      filterTerm: "",
    };
    this.handleColumnSort = this.handleColumnSort.bind(this);
    this.handleRowSizeChange = this.handleRowSizeChange.bind(this);
    this.handleNextPageClick = this.handleNextPageClick.bind(this);
    this.handlePreviousPageClick = this.handlePreviousPageClick.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    if (this.props.onCellClick) {
      this.handleCellClick = this.props.onCellClick.bind(this);
    }
  }

  displayRows(rows=this.state.allRows, start=this.state.startRow, rowsToDisplay=this.state.rowsToDisplay) {
    let newRows = []
    if (this.props.rowLinks) {
      for (let i = 0; i<rows.length; i++) {
        let newCol = {}
        for (let col in rows[i]) {
          let linkText = this.props.rowLinks.url + rows[i][this.props.rowLinks.column]
          let targetText = ""
          if (this.props.rowLinks.newTab === true) {
            targetText = "_blank"
          }
          newCol[col] = <Link to={linkText} target={targetText} style={{ textDecoration: 'none', color: '#000'}}>{rows[i][col]}</Link>
        }
        newRows.push( newCol )
      }
    }
    else {
      newRows = this.state.allRows
    }
    this.setState({ displayRows: newRows.slice(start, start + rowsToDisplay) })
  }

  handleColumnSort(key, order) {
    let localRows = this.state.allRows;
    let mapped = localRows.map((row, i) => {
      return { index: i, value: row[key] }
    })
    mapped.sort((a, b) => {
      if (order === 'asc') {
        return (a.value > b.value) || (a.value === b.value) -1;
      }
      if (order === 'desc') {
        return (a.value < b.value) || (a.value === b.value) -1;
      }
    });

    let result = mapped.map( el =>
      localRows[el.index]
    );

    this.setState({
      allRows: result,
      startRow: 0,
      currentPage: 1,
    })
  }

  handleRowSizeChange( event, index, value ) {
    this.setState({
      rowsToDisplay: index,
      startRow: 0,
      currentPage: 1,
      filterTerm: "",
    })
  }

  handleNextPageClick( event ) {
    this.setState({
      startRow: this.state.startRow + this.state.rowsToDisplay,
      currentPage: this.state.currentPage += 1,
    })
  }

  handlePreviousPageClick( event ) {
    this.setState({
      startRow: this.state.startRow - this.state.rowsToDisplay,
      currentPage: this.state.currentPage -= 1,
    })
  }

  handleFilter(e, v) {
    this.setState({ filterTerm: v});
    let filteredResults = []
    for (let i = 0; i < this.state.allRows.length; i++) {
      let row = this.state.allRows[i]
      let hit = false
      for (let key in row) {
        if( (typeof row[key] === 'string') && (row[key].toLowerCase().indexOf(v.toLowerCase()) >= 0) ) {
          hit = true;
        }
      }
      if (hit) {
        filteredResults.push(row)
      }
    }
    this.displayRows(filteredResults);
  }

  componentDidUpdate(prevProps, prevState) {
    if ((this.state.allRows !== prevState.allRows) ||
        (this.state.startRow !== prevState.startRow) ||
        (this.state.rowsToDisplay !== prevState.rowsToDisplay)) {
          this.displayRows();
        }
  }

  componentDidMount() {
    this.setState({ allRows: this.props.data });
    this.displayRows();
  }

  componentWillReceiveProps(newProps) {
    if (this.props.data !== newProps.data) {
      this.setState({ allRows: newProps.data });
      this.displayRows();
    }
  }

  render() {
    if (!this.props.data.length) {
      return <h4>No Data in Table</h4>
    }

    return (
      <Grid fluid>
        <Row>
          <TextField
            hintText="Filter results"
            value={ this.state.filterTerm }
            onChange={ this.handleFilter }
            multiLine={true}
            rows={1}
            fullWidth={true}
          />
        </Row>
        <DataTables
          height={ 'auto' }
          selectable={ false }
          showRowHover={ true }
          rowSize={ this.state.rowsToDisplay }
          rowSizeList={ this.state.rowSizeList }
          columns={ this.props.columns }
          data={ this.state.displayRows }
          showCheckboxes={ false }
          page={ this.state.currentPage }
          count={ this.state.allRows.length }
          onSortOrderChange= { this.handleColumnSort }
          onRowSelection={ this.handleRowSelection }
          onRowSizeChange={ this.handleRowSizeChange }
          onNextPageClick={ this.handleNextPageClick }
          onPreviousPageClick={ this.handlePreviousPageClick }
          onCellClick={ this.handleCellClick }
        />
      </Grid>
    );
  }
}

BridgeDataTables.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  rowsToDisplay: PropTypes.number,
  rowSizeList: PropTypes.array,
  handleCellClick: PropTypes.func,
  router: PropTypes.func,
  rowLinks: PropTypes.object,
}

export default BridgeDataTables;
