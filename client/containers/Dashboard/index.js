import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Row from 'react-materialize/lib/Row';
import Col from 'react-materialize/lib/Col';

import Wrapper, { WrapperContent } from 'client/components/Wrapper';
import Header from 'client/components/Header';
import Footer from 'client/components/Footer';

const mapStateToProps = function () {
  return {};
};

const mapDispatchToProps = function () {
  return {};
};

class DashboardApp extends Component {

  constructor () {
    super(...arguments);
  }

  render () {
    return (
      <Wrapper className='dashboard-app'>
        <Header />
        <WrapperContent>
          <Row>
            <Col s={12}>
              <h2>Dashboard</h2>
            </Col>
          </Row>
        </WrapperContent>
        <Footer />
      </Wrapper>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DashboardApp)
);
