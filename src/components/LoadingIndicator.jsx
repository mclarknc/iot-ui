import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const LoadingIndicator = ({ message }) => (
  <div style={{ textAlign: "center", marginTop: "32px"}}>
    <CircularProgress /><br />
    { message }
  </div>
);

export default LoadingIndicator;
