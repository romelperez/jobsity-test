import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router';
import Row from 'react-materialize/lib/Row';
import Col from 'react-materialize/lib/Col';
import Button from 'react-materialize/lib/Button';

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
              <p>Build forms with configurable fields by categories.</p>
              <Link to='/builder'><Button waves='light'>Create New Form</Button></Link>
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
