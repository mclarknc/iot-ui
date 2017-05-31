import React from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import Dashboard from './Dashboard'
import { Grid, Row, Col } from 'react-flexbox-grid';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import { ListItem } from 'material-ui/List';
import MenuItem from 'material-ui/MenuItem'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLeftBar: (window.innerWidth > 1000 ? true: false)
    };
    this.handleResize.bind(this);
  }

  handleToggle() {
     this.setState({showLeftBar: !this.state.showLeftBar});
   }
  handleClose() {
    //this.setState({showLeftBar: (window.innerWidth > 1000? true: false)});
    console.log(this)
  }
  handleResize() {
    if (window.innerWidth > 1000) {
      this.setState({ showLeftBar: true});
    }
    else {
      this.setState({ showLeftBar: false });
  }
    }

  componentDidMount() {
      window.addEventListener('resize', this.handleResize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }


  render() {
    let margins = {marginLeft: this.state.showLeftBar ? 250 : 0, marginRight: 0, paddingTop: 64 }
    return (
      <div>
        <AppBar title="Syliant Monitor"
          style={{zIndex: 10000}}
        />
        <Grid fluid>
          <Row>
            <Col xs={12} md={12}>
              <div style={ margins }>
                <Router>
                  <Route path="/dashboard" component={Dashboard} />
                </Router>
              </div>
            </Col>
          </Row>
        </Grid>
        <Drawer
          containerStyle={{ top: 64 }}
          docked={ this.state.showLeftBar }
          onRequestChange={ (open) => this.setState({showLeftBar: open})} >
          <ListItem
            key={0}
            disabled={true}
            primaryText={ 'mclark' }
            secondaryText={ 'Michael Clark' }
          />
          <Divider />
          <MenuItem key={10} onTouchTap={this.handleClose} href="/#/dashboard">Dashboard</MenuItem>
          <MenuItem key={11} onTouchTap={this.handleClose} href="/#">All Monitors</MenuItem>
          <MenuItem key={12} onTouchTap={this.handleClose} href="/#">Notifications</MenuItem>
          <MenuItem key={13} onTouchTap={this.handleClose} href="/#">Account Settings</MenuItem>
          <MenuItem key={14} onTouchTap={this.handleClose} href="/#">Company Settings</MenuItem>
        </Drawer>
      </div>
    )
  }
};

export default App;
