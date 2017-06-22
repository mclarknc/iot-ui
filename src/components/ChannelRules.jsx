import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'
import LoadingIndicator from './LoadingIndicator'
import rulesQuery from '../graphql/queries/rulesByChannel.graphql'
import RuleContacts from './RuleContacts'

class ChannelRules extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ruleIds: {}
    }
  }
  handleRowSelection = (selectedRow) => {
    console.log("rule/" + this.state.ruleIds[selectedRow])
    this.props.history.push("/rule/" + this.state.ruleIds[selectedRow])
  }
  componentWillReceiveProps(newProps) {
      let localRuleIds = {}
        newProps.rulesQuery.rulesByChannel.map( (rule, idx ) => {
          localRuleIds[idx] = rule.id
        })
        this.setState({ruleIds: localRuleIds})
  }
  render() {
    let { loading, rulesByChannel } = this.props.rulesQuery
    if ( loading ) {
      return (
        <LoadingIndicator message={"Loading rules"} />
      )
    }
    let channel = this.props.channel
    let rulesList = rulesByChannel.map( ( rule, idx ) => {
      let value
      if (rule.lowerThreshold !== -1 && rule.upperThreshold !== -1) {
        value = rule.lowerThreshold + " and " + rule.upperThreshold
      }
      else if (rule.lowerThreshold === -1) {
        value = rule.upperThreshold
      }
      else {
        value = rule.lowerThreshold
      }
      return (
        <TableRow key={ idx }
          hoverable={ true }
          hovered={ true }>
          <TableRowColumn style={{width: '35%', whiteSpace: 'normal', overflow: 'visible'}}>{ rule.name } { value } { channel.channelType.units.unitImperial}</TableRowColumn>
          <TableRowColumn style={{width: '50%', whiteSpace: 'normal', overflow: 'visible'}}><RuleContacts id={ rule.id } /></TableRowColumn>
          <TableRowColumn style={{width: '15%', whiteSpace: 'normal', overflow: 'visible'}}>{ rule.state === 0 ? "Active" : "Inactive" }</TableRowColumn>
        </TableRow>
      )
    })
    if (rulesList.length === 0) {
      rulesList = "No rules"
    }
    return (
      <Table onRowSelection={ this.handleRowSelection }>
        <TableHeader displaySelectAll={ false } adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn style={{textAlign: 'left', width: '35%'}}>Name</TableHeaderColumn>
            <TableHeaderColumn style={{textAlign: 'left', width: '50%'}}>Contacts</TableHeaderColumn>
            <TableHeaderColumn style={{textAlign: 'left', width: '15%'}}>State</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={ false }
          showRowHover={ true }>
          { rulesList }
        </TableBody>
      </Table>
    )
  }
}

export default graphql(rulesQuery, {
    name: 'rulesQuery',
    options: ( props ) => ({
      variables: {
        id: props.channel.id
      }
    })
  })(ChannelRules)
