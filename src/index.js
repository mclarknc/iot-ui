import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import injectTapEventPlugin from 'react-tap-event-plugin';

// material-ui imports
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

// Needed for onTouchTap
injectTapEventPlugin();

const graphql_port = process.env.PORT || '3000';
const graphql_uri = 'http://localhost:' + graphql_port + '/graphql';
// const networkInterface = createNetworkInterface({
//     uri: graphql_uri
// });

console.log(`Graphql PORT: ${ graphql_port }`)

// const client = new ApolloClient({
//     networkInterface: networkInterface
// });


ReactDOM.render (
    <MuiThemeProvider muiTheme={ getMuiTheme(darkBaseTheme) }>
	<AppBar title="App Title" />
    </MuiThemeProvider>,
    document.getElementById('app')
);

