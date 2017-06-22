import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { graphql, compose } from 'react-apollo'
import ChannelRules from './ChannelRules'
import LoadingIndicator from './LoadingIndicator'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import BackArrow from 'material-ui/svg-icons/hardware/keyboard-backspace'
import channelQuery from '../graphql/queries/channel.graphql'

class Channel extends Component {
  handleButtonClick = (e) => {
    console.log('click')
    this.props.history.goBack()
  }
  render() {
    let { loading, channel } = this.props.channelQuery
    if ( loading ) {
      return <LoadingIndicator message="Loading channel" />
    }
    return (
      <Grid style={{ paddingLeft: '0rem', paddingRight: '0rem'}} fluid>
        <Row style={{marginLeft: -30, marginRight: -32, marginTop: 0, color: 'white', backgroundColor: 'rgb(0, 151, 167)', padding: 20, fontSize: 'x-large'}}>
          <Col md={12}>
            <span style={{ fontSize: 24, fontWeight: 300}}>Channel Details     </span>
            <FlatButton
              label="Return to monitor"
              icon={<BackArrow />}
              style={{color: 'white'}}
              onTouchTap={ this.handleButtonClick }
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <h4 style={{ fontSize: 24 , fontWeight: 300}}>Settings for { this.props.match.params.monitor }: { channel.name }</h4>
            <TextField
              floatingLabelText={"Monitor"}
              defaultValue={ this.props.match.params.monitor}
              inputStyle={{width: 400}}
              underlineStyle={{width: 400}}
            /><br />
            <TextField
              floatingLabelText={"Channel type"}
              defaultValue={ channel.channelType.commonName }
              inputStyle={{width: 400}}
              underlineStyle={{width: 400}}
            /><br />
            <TextField
              floatingLabelText={"Channel name"}
              defaultValue={ channel.name }
              inputStyle={{width: 400}}
              underlineStyle={{width: 400}}
            /><br />
            <TextField
              floatingLabelText={"Offset value"}
              defaultValue={ channel.offsetValue }
              inputStyle={{width: 400}}
              underlineStyle={{width: 400}}
            /><br />
            <TextField
              floatingLabelText={"Update interval (seconds)"}
              defaultValue={ channel.updateInterval }
              inputStyle={{width: 400}}
              underlineStyle={{width: 400}}
            /><br />
            <TextField
              floatingLabelText={"Display template"}
              defaultValue={ channel.displayTemplateName }
              inputStyle={{width: 400}}
              underlineStyle={{width: 400}}
            />
          </Col>
          <Col md={6}>
            <h4 style={{ fontSize: 24, fontWeight: 300}}>Rules for { channel.name }</h4>
            <ChannelRules channel={ channel } history={ this.props.history } />
          </Col>
        </Row>
    </Grid>
    )
  }
}

export default graphql(channelQuery, {
    name: 'channelQuery',
    options: ( props ) => ({
      variables: {
        id: props.match.params.id
      }
    })
  })(Channel)
