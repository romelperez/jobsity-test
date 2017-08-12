/* eslint no-unused-vars: [0] */

import './_index.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default class AttributeForm extends Component {

  constructor () {
    super(...arguments);
  }

  render () {

    const { _id, isValid, params, onChange, className, ...etc } = this.props;
    const cls = cx('', className);

    return (
      <div className={cls} {...etc}>
        Attribute Form
      </div>
    );
  }
}

AttributeForm.propTypes = {
  _id: PropTypes.string.isRequired,
  isValid: PropTypes.bool,
  params: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    defaultValue: PropTypes.string,
    type: PropTypes.string,
    format: PropTypes.string,
    enum: PropTypes.arrayOf(PropTypes.string),
    rangeMin: PropTypes.string,
    rangeMax: PropTypes.string,
    unitsOfMeasurement: PropTypes.string,
    precision: PropTypes.string,
    accuracy: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func,
};

AttributeForm.defaultProps = {
  isValid: false,
  onChange () {},
};
