import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Row from 'react-materialize/lib/Row';
import Col from 'react-materialize/lib/Col';

import * as actionsCats from 'client/actions/cats';
import Wrapper, { WrapperContent } from 'client/components/Wrapper';
import Header from 'client/components/Header';
import Footer from 'client/components/Footer';
import Loading from 'client/components/Loading';

const mapStateToProps = function (state) {
  return {
    cats: state.cats,
    fields: state.fields,
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    handleFetchCats: (...args) => dispatch(actionsCats.fetch(...args)),
  };
};

class DashboardApp extends Component {

  constructor () {
    super(...arguments);
  }

  componentDidMount () {
    this.props.handleFetchCats();
  }

  render () {

    const { isFetching, list: cats } = this.props.cats;

    return (
      <Wrapper className='dashboard-app'>
        <Header />
        <WrapperContent>
          <Row>
            <Col s={12}>
              { isFetching && <Loading /> }
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
