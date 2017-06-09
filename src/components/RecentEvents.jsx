import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { graphql, compose } from 'react-apollo'
import moment from 'moment'
import monitorQuery from '../graphql/queries/monitor.graphql'
import activeAlertsByMonitorQuery from '../graphql/queries/alertsByMonitor.graphql'
import lastNAlertsByMonitorQuery from '../graphql/queries/lastNAlertsByMonitor.graphql'
import LoadingIndicator from './LoadingIndicator'

// material-ui imports
import { Tabs, Tab } from 'material-ui/Tabs'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import { List, ListItem } from 'material-ui/List'
import WarningIcon from 'material-ui/svg-icons/alert/warning'
import Avatar from 'material-ui/Avatar'
import { cyan500, cyan700 } from 'material-ui/styles/colors'

class RecentEvents extends Component {
  render() {
    let { loading, lastNAlertsByMonitor } = this.props.lastNAlertsByMonitorQuery
    if ( loading ) {
      return <LoadingIndicator message="Loading recent events" />
    }
    let lastFiveAlerts = lastNAlertsByMonitor.map( ( alert, idx ) => {
      let data = JSON.parse(alert.data)
      if (data['event_type'] === 'offline') {
        return (
          <ListItem key={idx}
            primaryText = {this.props.monitor.name + ' was offline ' + moment(alert.timestamp).fromNow()}
            secondaryText={ data['resolved'] ? 'From ' + moment(alert.timestamp).format('MMM Do, YYYY H:mm') +
              ' to ' + moment(data['resolved']).format('MMM Do, YYYY H:mm'):
              'Last contact was ' + moment(this.props.monitor.lastUpdate).format('MMM Do, YYYY H:mm')}
          />
        )
      }
      else if (data['event_type'] === 'rule') {
        return (
          <ListItem key={idx}
            primaryText = {'Rule generated an alert ' + moment(alert.timestamp).fromNow()}
            secondaryText = {this.props.monitor.name + ' reported that a rule has been activated'}
          />
        )
      }
    })
    return (
      <Card style={{marginTop: 20}}>
        <CardHeader style={{ backgroundColor: cyan500, height: 50, verticalAlign: 'middle', zIndex: 0}}
          title="Recent Events"
          titleColor="white"
          titleStyle={{ fontSize: 'x-large', verticalAlign: 'middle'}}
        />
        <Row>
          <Col md={12}>
            <List>
              { lastFiveAlerts }
            </List>
          </Col>
        </Row>
      </Card>
    )
  }
}

export default compose (
  graphql(lastNAlertsByMonitorQuery, {
    name: 'lastNAlertsByMonitorQuery',
    options: ( props ) => ({
      variables: {
        id: props.monitor.id
      }
    })
  })
)(RecentEvents)
