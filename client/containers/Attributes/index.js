import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionsCategories from 'client/actions/categories';
import * as actionsAttributes from 'client/actions/attributes';
import Wrapper, { WrapperContent } from 'client/components/Wrapper';
import Header from 'client/components/Header';
import Footer from 'client/components/Footer';

const mapStateToProps = function (state) {
  return {
    categories: state.categories,
    attributes: state.attributes,
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    handleCategoriesSave: (...args) => dispatch(actionsCategories.save(...args)),
    handleAttributesAdd: (...args) => dispatch(actionsAttributes.add(...args)),
    handleAttributesSave: (...args) => dispatch(actionsAttributes.save(...args)),
    handleAttributesRemove: (...args) => dispatch(actionsAttributes.remove(...args)),
  };
};

class BuilderApp extends Component {

  constructor () {
    super(...arguments);
  }

  componentWillMount () {

    // Set up default categories
    const categories = [
      {
        _id: '794bd6c1-b2da-4fcc-9a4a-24a9d983d53c',
        name: 'Device Info',
        position: 0,
      },
      {
        _id: '9bbc42a2-2986-418a-9954-5074cbd74341',
        name: 'Sensors',
        position: 1,
      },
      {
        _id: '6c6e4be9-2af7-40c8-a4cf-8376479955e7',
        name: 'Settings',
        position: 2,
      },
      {
        _id: '7642022e-72d5-46f2-a613-f1f53091f237',
        name: 'Commands',
        position: 3,
      },
      {
        _id: '1407b495-5dc6-4d61-add8-e776999cf5c0',
        name: 'Metadata',
        position: 4,
      }
    ];
    this.props.handleCategoriesSave(categories);
  }

  render () {
    return (
      <Wrapper className='attributes-app'>
        <Header />
        <WrapperContent className='attributes-app__main'>
        </WrapperContent>
        <Footer />
      </Wrapper>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuilderApp);
