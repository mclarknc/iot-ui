import React, { Component } from 'react'
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import { Grid, Row, Col } from 'react-flexbox-grid'
import { graphql } from 'react-apollo'
import TextField from 'material-ui/TextField'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'
import LoadingIndicator from './LoadingIndicator'
import channelsQuery from '../graphql/queries/channelsByMonitor.graphql'

class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      channelIds: {}
    }
  }

  handleRowSelection = (selectedRow) => {
      this.props.history.push("/channel/" + this.props.monitor.name + "/" + this.state.channelIds[selectedRow])
  }

  componentWillReceiveProps(newProps) {
      let localChannelIds = {}

        let chanList = newProps.channelsQuery.channelsByMonitor.map( (chan, idx ) => {
          localChannelIds[idx] = chan.id
        })
        this.setState({channelIds: localChannelIds})

  }

  render() {
    let { loading, channelsByMonitor } = this.props.channelsQuery
    if ( loading ) {
      return (
        <LoadingIndicator message={"Loading channels"} />
      )
    }
    let channelsList = channelsByMonitor.map( ( chan, idx ) => {
        return (
          <TableRow key={ idx }
            hoverable={ true }
            hovered={ true }>
            <TableRowColumn style={{width: '35%'}}>{ chan.name }</TableRowColumn>
            <TableRowColumn style={{width: '35%'}}>{ chan.channelType.commonName }</TableRowColumn>
            <TableRowColumn style={{width: '15%'}}>{ chan.updateInterval }</TableRowColumn>
            <TableRowColumn style={{width: '15%'}}>{ 1 }</TableRowColumn>
          </TableRow>
        )
    })

    return (
      <Grid style={{ paddingLeft: '0rem', paddingRight: '0rem'}} fluid>
        <Row>
          <Col md={4}>
            <span style={{"fontSize": 24, fontWeight: 300}}>Monitor Settings</span><br />
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
          <Col md={7}>
            <span style={{"fontSize": 24, fontWeight: 300}}>Channels</span><span style={{"fontSize": "small", "color":"gray"}}> Click to edit</span><br />
            <Table onRowSelection={ this.handleRowSelection }>
              <TableHeader displaySelectAll={ false } adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn style={{textAlign: 'left', width: '35%'}}>Name</TableHeaderColumn>
                  <TableHeaderColumn style={{textAlign: 'left', width: '35%'}}>Type</TableHeaderColumn>
                  <TableHeaderColumn style={{textAlign: 'left', width: '15%'}}>Update Interval</TableHeaderColumn>
                  <TableHeaderColumn style={{textAlign: 'left', width: '15%'}}>Rules</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={ false }
                showRowHover={ true }>
                { channelsList }
              </TableBody>
            </Table>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default graphql(channelsQuery, {
    name: 'channelsQuery',
    options: ( props ) => ({
      variables: {
        monitorId: props.monitor.id
      }
    })
  })(Settings)
