import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import LoadingIndicator from './LoadingIndicator'
import ruleContactQuery from '../graphql/queries/ruleContacts.graphql'

class RuleContacts extends Component {
  render() {
    let { loading, ruleContacts } = this.props.ruleContactQuery
    if ( loading ) {
      return (
        <LoadingIndicator message={"Loading contacts"} />
      )
    }
    let ruleContactList = ruleContacts.map( ( contact, idx ) => {
        return (
          contact.lastName + ", " + contact.firstName + "; "
        )
    })

    return (
      <p>{ruleContactList}</p>
    )
  }
}

export default graphql(ruleContactQuery, {
    name: 'ruleContactQuery',
    options: ( props ) => ({
      variables: {
        id: props.id
      }
    })
  })(RuleContacts)
