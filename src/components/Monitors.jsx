import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { graphql, compose } from 'react-apollo'
import moment from 'moment'
import LoadingIndicator from './LoadingIndicator'
import BridgeDataTables from './BridgeDataTables'
import monitorsQuery from '../graphql/queries/monitors.graphql'
import activeAlertsQuery from '../graphql/queries/alerts.graphql'

class Monitors extends Component {
  constructor(props) {
    super(props)
    this.state = {
      results: [],
      alerts: {}
    }
  }

  buildTableRow(r) {
    let row = {}
    row['id'] = r.id
    row['name'] = r.name
    row['status'] = r.status === 'A_0'? 'Active' : 'Inactive'
    row['company'] = r.company.name
    row['model'] = r.model.name
    row['lastUpdate'] = moment(r.lastUpdate).fromNow()
    return row
  }

  componentWillReceiveProps(newProps) {
    if ( newProps.monitorsQuery.allMonitors ) {
      let mons = []
      newProps.monitorsQuery.allMonitors.map( mon => {
        mons.push(this.buildTableRow(mon))
      })
      this.setState({ results: mons })
    }
    if ( newProps.activeAlertsQuery.activeAlerts ) {
      let lerts = {}
      newProps.activeAlertsQuery.activeAlerts.map( lert => {
        lerts[lert.targetObjectId] = lert.id
      })
      this.setState({ alerts: lerts })
    }
  }

  render() {
    const TABLE_COLUMNS = [
      {
        key: 'id',
        label: 'ID',
        sortable: true,
        style: {
          width: '7%',
        }
      },
      {
        key: 'name',
        label: 'Name',
        sortable: true,
        style: {
          width: '15%',
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
          width: '15%',
          wordWrap: 'breakWord',
          whiteSpace: 'normal',
        },
      },
      {
        key: 'lastUpdate',
        label: 'Last Update',
        sortable: false,
        style: {
          width: '25%',
          wordWrap: 'breakWord',
          whiteSpace: 'normal',
        },
      },
    ]
    if ( this.props.monitorsQuery.loading || this.props.activeAlertsQuery.loading ) {
      return <LoadingIndicator message="Loading monitors." />
    }

    return (
      <Grid fluid>
        <Row>
          <Col md={12}>
            <h3 style={{fontWeight: 300}}>{ this.state.results.length } Active Monitors</h3>
          </Col>
        </Row>
        <Row>
          <BridgeDataTables
            rowsToDisplay={ 25 }
            rowSizeList={ [10, 25, 50, 100] }
            columns={ TABLE_COLUMNS }
            data={ this.state.results }
            rowLinks={ {url: '/monitor/', column: 'id', newTab: false} }
          />
        </Row>
      </Grid>
    )
  }
}

export default compose (
  graphql(monitorsQuery, {
    name: 'monitorsQuery',
    options: (props) => ({})
  }),
  graphql(activeAlertsQuery, {
    name: 'activeAlertsQuery',
    options: (props) => ({})
  })
)(Monitors)
