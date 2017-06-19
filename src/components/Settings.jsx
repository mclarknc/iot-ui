import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { graphql } from 'react-apollo'
import moment from 'moment'
import TextField from 'material-ui/TextField'
import LoadingIndicator from './LoadingIndicator'

class Settings extends Component {
  render() {
    console.log(this.props.monitor)
    return (
      <Grid style={{ paddingLeft: '0rem', paddingRight: '0rem'}} fluid>
        <Row>
          <Col md={6}>
            <h3>Monitor Settings</h3>
            <TextField
              floatingLabelText={"Name"}
              defaultValue={ this.props.monitor.name}
            /><br />
            <TextField
              floatingLabelText={"Status"}
              defaultValue={ this.props.monitor.status === "A_0" ? "active" : "inactive"}
            /><br />
            <TextField
              floatingLabelText={"Latitude"}
              defaultValue={ this.props.monitor.latitude }
            /><br />
            <TextField
              floatingLabelText={"Longitude"}
              defaultValue={ this.props.monitor.longitude }
            />
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default Settings
