import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './components/App';
import Dashboard from './components/Dashboard'

// material-ui imports
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

// Needed for onTouchTap
injectTapEventPlugin();

const graphql_port = process.env.PORT || '443';
const graphql_uri = 'https://' + process.env.MONITOR_URL
console.log(`Graphql URI: ${graphql_uri}`)
console.log(`Graphql PORT: ${ graphql_port }`)
const networkInterface = createNetworkInterface({
    uri: graphql_uri
});

const client = new ApolloClient({
    networkInterface: networkInterface
});

ReactDOM.render (
  <ApolloProvider client={ client }>
    <MuiThemeProvider muiTheme={ getMuiTheme(lightBaseTheme) }>
      <Router>
        <App />
      </Router>
    </MuiThemeProvider>
  </ApolloProvider>,
  document.getElementById('app')
);
