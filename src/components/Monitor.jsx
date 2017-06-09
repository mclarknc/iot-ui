import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { graphql } from 'react-apollo'
import { Tabs, Tab } from 'material-ui/Tabs'
import LoadingIndicator from './LoadingIndicator'
import monitorQuery from '../graphql/queries/monitor.graphql'
import MonitorDetail from './MonitorDetail'
import History from './History'

class Monitor extends Component {
  render() {
    let { loading, monitor } = this.props.monitorQuery
    if ( loading ) {
      return <LoadingIndicator message="Loading monitor" />
    }
    return (
      <Grid style={{ paddingLeft: '0rem', paddingRight: '0rem'}} fluid>
        <Row style={{marginLeft: -30, marginRight: -32, marginTop: 0, color: 'white', backgroundColor: 'rgb(0, 151, 167)', padding: 20, fontSize: 'x-large'}}>
          <Col md={12}>{ monitor.name } Details</Col>
        </Row>
      <Tabs style={{ marginLeft: -30, marginRight: -32, marginTop: -8, width: 'auto'}}>
        <Tab label="Current Status" style={{backgroundColor: 'rgb(0, 151, 167)'}}>
          <div style={{ width: '100%', paddingLeft: 30, paddingTop: 20}}>
            <MonitorDetail
              monitor={ monitor }
            />
          </div>
        </Tab>
        <Tab label="History" style={{backgroundColor: 'rgb(0, 151, 167)'}}>
          <div style={{ width: '100%', paddingLeft: 30, paddingTop: 20}}>
            <History monitorId={monitor.id} />
          </div>
        </Tab>
        <Tab label="Settings" style={{backgroundColor: 'rgb(0, 151, 167)'}}>
          <h4>Settings Component goes here</h4>
        </Tab>
      </Tabs>
    </Grid>
    )
  }
}

export default graphql(monitorQuery, {
    name: 'monitorQuery',
    options: ( props ) => ({
      variables: {
        id: props.match.params.id
      }
    })
  })(Monitor)
