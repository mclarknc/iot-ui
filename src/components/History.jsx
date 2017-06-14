import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { graphql } from 'react-apollo'
import moment from 'moment'
import { List, ListItem } from 'material-ui/List'
import LoadingIndicator from './LoadingIndicator'
import channelsByMonitorQuery from '../graphql/queries/channelsByMonitor.graphql'
import HistoryChart from './HistoryChart'

class History extends Component {
  render() {
    let { loading, channelsByMonitor } = this.props.channelsByMonitorQuery
    if ( loading ) {
      return <LoadingIndicator message="Loading history" />
    }
    let channels = channelsByMonitor.map( (channel, idx ) => {
      let now = moment().format('YYYY-MM-DDTHH:MM:SS')
      let thirtyDaysAgo = moment().subtract(30, 'days').format('YYYY-MM-DDTHH:MM:SS')
      return (
        <HistoryChart
          key={idx}
          channel={ channel }
          startDate={ thirtyDaysAgo }
          endDate= { now }
        />
      )
    })
    return (
      <Grid style={{ paddingLeft: '0rem', paddingRight: '0rem'}} fluid>
        <Row>
          <Col md={12}>
            <List>
              { channels }
            </List>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default graphql(channelsByMonitorQuery, {
    name: 'channelsByMonitorQuery',
    options: ( props ) => ({
      variables: {
        monitorId: props.monitorId
      }
    })
  })(History)
