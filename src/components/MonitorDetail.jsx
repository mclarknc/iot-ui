import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { graphql, compose } from 'react-apollo'
import moment from 'moment'
import monitorQuery from '../graphql/queries/monitor.graphql'
import activeAlertsByMonitorQuery from '../graphql/queries/alertsByMonitor.graphql'
import lastNAlertsByMonitorQuery from '../graphql/queries/lastNAlertsByMonitor.graphql'
import LoadingIndicator from './LoadingIndicator'
import RecentEvents from './RecentEvents'

// material-ui imports
import { Tabs, Tab } from 'material-ui/Tabs'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import { List, ListItem } from 'material-ui/List'
import WarningIcon from 'material-ui/svg-icons/alert/warning'
import Avatar from 'material-ui/Avatar'
import { cyan500, cyan700 } from 'material-ui/styles/colors'

class MonitorDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lastFiveAlerts: []
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.lastNAlertsByMonitorQuery.lastNAlertsByMonitor) {
      let lastFiveAlerts = newProps.lastNAlertsByMonitorQuery.lastNAlertsByMonitor.map( ( lert, idx ) => {
        return (
          <ListItem key={idx}
            primaryText={lert.verb}
          />
        )
      })
      this.setState({ lastFiveAlerts: lastFiveAlerts })
    }
  }
  render() {
    let monitor = this.props.monitor
    let { loading, activeAlertsByMonitor } = this.props.activeAlertsByMonitorQuery
    let { lastNAlertsByMonitor } = this.props.lastNAlertsByMonitorQuery
    if ( loading ) {
      return <LoadingIndicator message="Loading monitor" />
    }
    let channels = monitor.channelSet.map( (chan, idx) => {
      return (
          <ListItem key={idx}
            primaryText={ chan.name}
            secondaryText={
              <p style={{ WebkitLineClamp: 25, height: 'auto'} }>
                Last Reading: { chan.lastReading.finalValue } <br />
                Updating every { chan.updateInterval/60 } minutes
              </p>}
          />
      )
    })
    let activeAlerts = activeAlertsByMonitor.map( ( alert, idx ) => {
      return (
        <ListItem key={idx}
          primaryText={ monitor.name + ' ' + alert.verb }
          secondaryText={ moment(alert.timestamp).format('MMM Do, YYYY H:mm:ss') }
        />
      )
    })
    return (
      <Grid fluid>
        <Row style={{ width:'95%'}}>
          { activeAlerts.length > 0 &&
            <Col md={12}>
              <Card>
                <CardHeader style={{ backgroundColor: 'red', height: 50 }}
                  title="Alert"
                  titleColor="white"
                  titleStyle={{ fontSize: 'x-large' }}
                  avatar={<WarningIcon color={'white'}/>}
                />
                <List>
                  {activeAlerts}
                </List>
              </Card>
            </Col>
            }
          <Col md={6}>
            <Card style={{marginTop: 20}}>
              <CardHeader style={{ backgroundColor: cyan500, height: 50, verticalAlign: 'middle'}}
                title="Status"
                titleColor="white"
                titleStyle={{ fontSize: 'x-large', verticalAlign: 'middle'}}
              />
              <Row>
                <Col md={6}>
                  <List>
                    { channels }
                  </List>
                </Col>
                <Col md={6}>
                  <List>
                    <ListItem key={1}
                      primaryText="Last update"
                      secondaryText={moment(monitor.lastUpdate).format('MMM Do, YYYY H:mm:ss')}
                    />
                  </List>
                </Col>
              </Row>
            </Card>
            <Card style={{marginTop: 20}}>
              <CardHeader style={{ backgroundColor: cyan500, height: 50, verticalAlign: 'middle'}}
                title="Current Settings"
                titleColor="white"
                titleStyle={{ fontSize: 'x-large', verticalAlign: 'middle'}}
              />
              <Row>
                <Col md={6}>
                  <List>
                    <ListItem key={1}
                      primaryText="Model"
                      secondaryText={ monitor.model.name + " (" + monitor.model.model + ")"}
                    />
                    <ListItem key={2}
                      primaryText="Firmware"
                      secondaryText={monitor.firmware.version}
                    />
                  </List>
                </Col>
                <Col md={6}>
                  <List>
                    <ListItem key={1}
                      primaryText="Company"
                      secondaryText={monitor.company.name}
                    />
                  </List>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col md={6}>
            <RecentEvents monitor={monitor} />
          </Col>
        </Row>
    </Grid>
    )
  }
}

export default compose (
  graphql(activeAlertsByMonitorQuery, {
    name: 'activeAlertsByMonitorQuery',
    options: ( props ) => ({
      variables: {
        id: props.monitor.id
      }
    })
  }),
  graphql(lastNAlertsByMonitorQuery, {
    name: 'lastNAlertsByMonitorQuery',
    options: ( props ) => ({
      variables: {
        id: props.monitor.id
      }
    })
  })
)(MonitorDetail)
