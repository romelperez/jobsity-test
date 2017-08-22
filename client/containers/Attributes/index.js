import './_index.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Row from 'react-materialize/lib/Row';
import Col from 'react-materialize/lib/Col';
import AppBar from 'material-ui/AppBar';
import { Tabs, Tab } from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import * as data from 'client/data';
import * as actionsCategories from 'client/actions/categories';
import * as actionsAttributes from 'client/actions/attributes';
import AttributeForm from 'client/components/AttributeForm';

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

class Attributes extends Component {

  constructor () {
    super(...arguments);

    this.state = {

      // The current category selected.
      categoryId: null,
    };
  }

  componentDidMount () {

    this.props.handleCategoriesSave(data.categories);

    // Select a category by default.
    const categoryId = data.categories[0] && data.categories[0]._id;
    this.setState({ categoryId });
  }

  render () {

    const { categoryId } = this.state;
    const { categories } = this.props;
    const categoriesList = categories.list.sort((a, b) => a.position - b.position);

    return (
      <div className='attributes'>

        {/* Header */}
        <header>
          <AppBar
            title='Romel Pérez, Jobsity - Test'
            showMenuIconButton={false}
          />
        </header>

        {/* Main */}
        <main className='attributes__main'>
          <Row>

            <Col s={12} l={7} className='attributes__column'>

              {/* Mobile Category Selector */}
              <SelectField
                className='attributes__select'
                value={categoryId}
                onChange={(ev, ind, val) => this.onTab(val)}
              >
                {categoriesList.map(category => (
                  <MenuItem
                    key={category._id}
                    primaryText={category.name}
                    value={category._id}
                  />
                ))}
              </SelectField>

              {/* Tabs */}
              <Tabs
                className='tabs'
                inkBarStyle={{ display: 'none' }}
                value={categoryId}
                onChange={val => this.onTab(val)}
              >
                { categoriesList.map(category => (
                  <Tab
                    key={category._id}
                    label={category.name}
                    value={category._id}
                    className='tab'
                  >
                    <div className='attributes__attributes'>
                      {this.getAttributesForms(category._id)}
                    </div>
                    <RaisedButton
                      label={<span><i className ='mdi mdi-plus' /> Add attribute</span>}
                      onClick={() => this.onAdd(category._id)}
                    />
                  </Tab>
                )) }
              </Tabs>

              {/* Options */}
              <Row className='attributes__opts'>
                <Col s={12}>
                  <RaisedButton
                    label={<span><i className='mdi mdi-content-save' /> Save Attributes</span>}
                    disabled={this.isSaveDisabled()}
                  />
                </Col>
              </Row>

            </Col>

            <Col s={12} l={5} className='attributes__column'>
              <p><b>Attributes as JSON:</b></p>
              {this.getJSON()}
            </Col>

          </Row>
        </main>

        {/* Footer */}
        <footer>
          <Row>
            <Col s={12}>
              <p>
                &copy; 2017
                {' '}
                <a href='https://romelperez.com' target='romelperez'>Romel Pérez</a>,
                {' '}
                <a href='http://jobsity.com' target='jobsity'>Jobsity</a>,
                {' '}
                <a href='https://github.com/romelperez/jobsity-test' target='github'>Source Code</a>
              </p>
            </Col>
          </Row>
        </footer>

      </div>
    );
  }

  onTab = (categoryId) => {
    this.setState({ categoryId });
  }

  onAdd = (categoryId) => {
    this.props.handleAttributesAdd({ categoryId });
  }

  onChange = (attribute) => {
    this.props.handleAttributesSave(attribute);
  }

  onRemove = (attributeId) => {
    this.props.handleAttributesRemove(attributeId);
  }

  isSaveDisabled = () => {
    const { list } = this.props.attributes;
    return !list.length || !!list.find(el => !el.isValid);
  }

  getAttributesForms = (categoryId) => {

    const { list: attributes } = this.props.attributes;
    const categoryAttributes = attributes.filter(el => el.params.categoryId === categoryId);
    const names = attributes.map(el => ({ _id: el._id, name: el.params.name }));

    if (!categoryAttributes.length) {
      return <p>There are no attributes for this category.</p>;
    }

    return categoryAttributes.map(el => (
      <AttributeForm
        key={el._id}
        attribute={el}
        names={names}
        onChange={this.onChange}
        onRemove={this.onRemove}
      />
    ));
  }

  getJSON = () => {
    const list = this.props.attributes.list.map(el => el.params);
    const json = JSON.stringify(list, null, 2);
    return (
      <pre><code>{json}</code></pre>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Attributes);
