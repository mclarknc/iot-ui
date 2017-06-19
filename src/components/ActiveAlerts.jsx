import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { Link } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import moment from 'moment'
import { List, ListItem } from 'material-ui/List'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import WarningIcon from 'material-ui/svg-icons/alert/warning'
import LoadingIndicator from './LoadingIndicator'
import activeAlertsQuery from '../graphql/queries/alerts.graphql'
import monitorsQuery from '../graphql/queries/monitors.graphql'

class ActiveAlerts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      monitors: {},
      alerts: []
    }
  }

  componentWillReceiveProps(newProps) {
    if ( newProps.monitorsQuery.allMonitors ) {
      let mons = {}
      newProps.monitorsQuery.allMonitors.map ( mon => {
        mons[mon.id] = mon.name
      })
      this.setState({ monitors: mons })
    }
  }

  render() {
    if ( this.props.activeAlertsQuery.loading || this.props.monitorsQuery.loading ) {
      return <LoadingIndicator message="Fetching active alerts." />
    }
    let alerts = this.props.activeAlertsQuery.activeAlerts.map( ( alert, idx ) => {
      if ( !this.state.monitors[alert.targetObjectId] ) {
        return
      }
      return (
        <Link
          key={idx}
          to={ "/monitor/" + alert.targetObjectId}
          style={{ textDecoration: 'none', color: '#000'}}>
        <ListItem key={idx}
          primaryText={ moment(alert.timestamp).format('MMM Do (H:mm a)')}
          secondaryText={ this.state.monitors[alert.targetObjectId]  + ' ' +  alert.verb }
          leftIcon={<WarningIcon color='red' />}
        />
      </Link>
      )
    })
    return (
      <Card>
        <CardTitle
          title='Active alerts'
          subtitle={ this.props.activeAlertsQuery.activeAlerts.length + ' active alerts.'} />
        <CardText>
          { alerts }
        </CardText>
      </Card>
    )
  }
}

export default compose (
  graphql(monitorsQuery, {
    name: 'monitorsQuery',
    options: ( props ) => ({})
  }),
  graphql(activeAlertsQuery, {
    name: 'activeAlertsQuery',
    options: ( props ) => ({})
    // skip: ( props ) => (props.monitorsQuery.loading || props.monitorsQuery.error || props.monitorsQuery.allMonitors.length <= 0),
  })
)(ActiveAlerts)
