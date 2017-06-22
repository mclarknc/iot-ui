import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { graphql, compose } from 'react-apollo'
import ChannelRules from './ChannelRules'
import LoadingIndicator from './LoadingIndicator'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import BackArrow from 'material-ui/svg-icons/hardware/keyboard-backspace'
import ruleQuery from '../graphql/queries/rule.graphql'

class Rule extends Component {
  handleButtonClick = (e) => {
    this.props.history.goBack()
  }
  render() {
    let { loading, rule } = this.props.ruleQuery
    if ( loading ) {
      return <LoadingIndicator message="Loading rule" />
    }
    return (
      <Grid style={{ paddingLeft: '0rem', paddingRight: '0rem'}} fluid>
        <Row style={{marginLeft: -30, marginRight: -32, marginTop: 0, color: 'white', backgroundColor: 'rgb(0, 151, 167)', padding: 20, fontSize: 'x-large'}}>
          <Col md={12}>
            <span style={{ fontSize: 24, fontWeight: 300}}>Edit Rule     </span>
            <FlatButton
              label="Return to channel page"
              icon={<BackArrow />}
              style={{color: 'white'}}
              onTouchTap={ this.handleButtonClick }
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <TextField
              floatingLabelText={"Name"}
              defaultValue={ rule.name}
              inputStyle={{width: 400}}
              underlineStyle={{width: 400}}
            /><br />
            <TextField
              floatingLabelText={"Lower threshold"}
              defaultValue={ rule.lowerThreshold }
              inputStyle={{width: 400}}
              underlineStyle={{width: 400}}
          />
          </Col>
        </Row>
    </Grid>
    )
  }
}

export default graphql(ruleQuery, {
  name: 'ruleQuery',
  options: ( props ) => ({
    variables: {
      id: props.match.params.id
    }
  })
})(Rule)
