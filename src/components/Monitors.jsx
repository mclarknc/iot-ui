import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { graphql } from 'react-apollo'
import LoadingIndicator from './LoadingIndicator'
import BridgeDataTables from './BridgeDataTables'
import MonitorsQuery from '../graphql/queries/monitors.graphql'

class Monitors extends Component {
  constructor(props) {
    super(props)
    this.state = {
      results: []
    }
  }

  buildTableRow(r) {
    let row = {}
    row['name'] = r.name
    row['status'] = r.status === 'A_0'? 'Active' : 'Inactive'
    row['company'] = r.company.name
    row['model'] = r.model.name
    row['lastUpdate'] = r.lastUpdate
    return row
  }

  componentWillReceiveProps(newProps) {
    if ( newProps.data.allMonitors ) {
      let mons = []
      newProps.data.allMonitors.map( mon => {
        console.log(mon)
        mons.push(this.buildTableRow(mon))
      })
      this.setState({ results: mons })
      console.log(mons)
    }
  }

  render() {
    const TABLE_COLUMNS = [
      {
        key: 'name',
        label: 'Name',
        sortable: true,
        style: {
          width: '8%',
          wordWrap: 'breakWord',
          whiteSpace: 'normal',
        },
      },
      {
        key: 'status',
        label: 'Status',
        sortable: true,
        style: {
          width: '7%'
        },
      },
      {
        key: 'company',
        label: 'Company',
        sortable: true,
        style: {
          width: '15%',
          wordWrap: 'breakWord',
          whiteSpace: 'normal',
        },
      },
      {
        key: 'model',
        label: 'Model',
        sortable: true,
        style: {
          width: '25%',
          wordWrap: 'breakWord',
          whiteSpace: 'normal',
        },
      },
      {
        key: 'lastUpdate',
        label: 'Last Update',
        sortable: false,
        style: {
          width: '15%',
          wordWrap: 'breakWord',
          whiteSpace: 'normal',
        },
      },
    ]
    if ( this.props.data.loading ) {
      return <LoadingIndicator message="Loading monitors." />
    }

    return (
      <Grid fluid>
        <Row>
          <BridgeDataTables
            rowsToDisplay={ 25 }
            rowSizeList={ [10, 25, 50, 100] }
            columns={ TABLE_COLUMNS }
            data={ this.state.results }
          />
        </Row>
      </Grid>
    )
  }
}

export default graphql(MonitorsQuery, {
  options: (props) => ({})
})(Monitors)
