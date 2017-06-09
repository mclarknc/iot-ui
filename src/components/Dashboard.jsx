import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CartText} from 'material-ui/Card'
import ActiveAlerts from './ActiveAlerts'

class Dashboard extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    document.title = "Syliant: Dashboard"

    return (
      <Grid fluid>
        <Row>
          <Col md={12}>
            <div style={{ paddingTop: 20 }}>
              <ActiveAlerts />
            </div>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default Dashboard
