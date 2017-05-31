import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { graphql } from 'react-apollo'
import moment from 'moment'
import { List, ListItem } from 'material-ui/List'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import WarningIcon from 'material-ui/svg-icons/alert/warning'
import ActiveAlertsQuery from '../graphql/queries/alerts.graphql'

class ActiveAlerts extends Component {
  render() {
    if ( this.props.data.loading ) {
      return <h1>Loading...</h1>
    }
    let alerts = this.props.data.activeAlerts.map( ( alert, idx ) => {
      return (
        <ListItem key={idx}
          primaryText={ moment(alert.timestamp).format('MMM Do (H:mm a)')}
          secondaryText={ alert.verb }
          leftIcon={<WarningIcon color='red' />}
        />
      )
    })
    return (
      <Card>
        <CardTitle
          title='Active alerts'
          subtitle={ this.props.data.activeAlerts.length + ' active alerts.'} />
        <CardText>
          { alerts }
        </CardText>
      </Card>
    )
  }
}

export default graphql(ActiveAlertsQuery, {
  options: (props) => ({})
})(ActiveAlerts)
