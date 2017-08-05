import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

const mapStateToProps = function () {
  return {};
};

const mapDispatchToProps = function () {
  return {};
};

class AppApp extends Component {

  constructor () {
    super(...arguments);
  }

  render () {
    return this.props.children;
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AppApp)
);
