/* eslint no-unused-vars: [0] */

import './_index.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Row from 'react-materialize/lib/Row';
import Col from 'react-materialize/lib/Col';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import { ATTRIBUTES_TYPES, ATTRIBUTES_STRING_FORMATS } from 'client/consts';
import vulcanval from 'vulcanval';

const fieldStyle = { width: '100%' };
const textFieldInputStyle = {};
const vv = vulcanval({
  fields: [{
    name: 'name',
    required: true,
    validators: {
      isAlphanumeric: true,
      isLength: { min: 1, max: 64 },
    },
  }, {
    name: 'description',
    required: true,
    validators: {
      isLength: { min: 2, max: 64 },
    },
  }, {
    name: 'defaultValue',
    validators: {
      isLength: { max: 64 },
    },
  }, {
    name: 'type',
    required: true,
  }, {
    name: 'format',
  }]
});

export default class AttributeForm extends Component {

  constructor () {
    super(...arguments);

    this.state = {
      hasChanged: false,
      isToggled: false,
      errors: {},
    };
  }

  render () {

    const { attribute, names, onChange, onRemove, className, ...etc } = this.props;
    const cls = cx('attribute-form', className);
    const { _id, isValid, params } = attribute;
    const { errors } = this.state;

    return (
      <form className={cls} ref={el => (this.container = el)} data-id={_id} {...etc}>
        <Paper zDepth={1} style={{ marginBottom: '1rem', padding: '1rem' }}>
          <Row>

            {/* NAME */}
            <Col s={12} m={4}>
              <Row>
                <TextField
                  style={fieldStyle}
                  inputStyle={textFieldInputStyle}
                  type='text'
                  name='name'
                  floatingLabelText='Name'
                  hintText='Enter a name'
                  errorText={errors.name}
                  value={params.name}
                  onChange={ev => this.onChange('name', ev.target.value)}
                />
              </Row>
            </Col>

            {/* DESCRIPTION */}
            <Col s={12} m={8}>
              <Row>
                <TextField
                  style={fieldStyle}
                  inputStyle={textFieldInputStyle}
                  type='text'
                  name='description'
                  floatingLabelText='Description'
                  hintText='Enter a description for your new attribute'
                  errorText={errors.description}
                  value={params.description}
                  onChange={ev => this.onChange('description', ev.target.value)}
                />
              </Row>
            </Col>

          </Row>
          <Row>

            {/* DEVICE */}
            <Col s={12} m={4}>
              <Row>
                <TextField
                  style={fieldStyle}
                  inputStyle={textFieldInputStyle}
                  type='select'
                  floatingLabelText='Device Resource Type'
                  hintText='Default value'
                  disabled
                />
              </Row>
            </Col>

            {/* DEFAULT VALUE */}
            <Col s={12} m={8}>
              <Row>
                <TextField
                  style={fieldStyle}
                  inputStyle={textFieldInputStyle}
                  type='text'
                  name='defaultValue'
                  floatingLabelText='Default value'
                  hintText='Enter a default value'
                  disabled={this.isDefaultToDisabled()}
                  errorText={errors.defaultValue}
                  value={params.defaultValue}
                  onChange={ev => this.onChange('defaultValue', ev.target.value)}
                />
              </Row>
            </Col>

          </Row>
          <Row>

            {/* DATA TYPE */}
            <Col s={12} m={4}>
              <Row>
                <SelectField
                  style={fieldStyle}
                  name='type'
                  floatingLabelText='Data Type'
                  hintText='Select the data type'
                  errorText={errors.type}
                  value={params.type}
                  onChange={(ev, ind, value) => this.onChange('type', value)}
                >
                  <MenuItem value={ATTRIBUTES_TYPES.STRING} primaryText='String' />
                  <MenuItem value={ATTRIBUTES_TYPES.OBJECT} primaryText='Object' />
                </SelectField>
              </Row>
            </Col>

            {/* FORMAT */}
            <Col s={12} m={8}>
              <Row>
                <SelectField
                  style={fieldStyle}
                  name='format'
                  floatingLabelText='Format'
                  hintText='Select the format'
                  disabled={this.isFormatDisabled()}
                  errorText={errors.format}
                  value={params.format}
                  onChange={(ev, ind, value) => this.onChange('format', value)}
                >
                  {this.getFormats()}
                </SelectField>
              </Row>
            </Col>

          </Row>
        </Paper>
      </form>
    );
  }

  getFormats () {
    const { params } = this.props.attribute;
    if (params.type === ATTRIBUTES_TYPES.STRING) {
      const formats = ATTRIBUTES_STRING_FORMATS;
      return [
        <MenuItem key={formats.NONE} value={formats.NONE} primaryText='None' />,
        <MenuItem key={formats.NUMBER} value={formats.NUMBER} primaryText='Number' />,
        <MenuItem key={formats.BOOLEAN} value={formats.BOOLEAN} primaryText='Boolean' />,
        <MenuItem key={formats.DATETIME} value={formats.DATETIME} primaryText='DateTime' />,
        <MenuItem key={formats.CDATA} value={formats.CDATA} primaryText='CDATA' />,
        <MenuItem key={formats.URI} value={formats.URI} primaryText='URI' />
      ];
    }
    return (
      <MenuItem value='' primaryText='None' />
    );
  }

  /**
   * On field property update.
   * @param  {String} name
   * @param  {*} value
   */
  onChange = (name, value) => {

    const { attribute, names } = this.props;

    // Validate attributes's name duplicity.
    const attributeName = name === 'name' ? value : attribute.params.name;
    const duplicatedName = !!names.
      filter(el => el._id !== attribute._id).
      find(el => el.name === attributeName);

    const params = {
      ...attribute.params,
      [name]: value
    };

    let errors = vv.validate(params);
    const isValid = !duplicatedName && !errors;

    // If the name is duplicated, set it as a property name error.
    if (duplicatedName) {
      errors = errors || {};
      errors.name = "Attribute's name must be unique.";
    }

    const toUpdate = {
      _id: attribute._id,
      isValid,
      params
    };

    // If user changes the type to object.
    if (name === 'type' && value === ATTRIBUTES_TYPES.OBJECT) {
      toUpdate.params.defaultTo = '';
      toUpdate.params.format = '';
    }

    this.setState({ errors: errors || {} });

    this.props.onChange(toUpdate);
  }

  isDefaultToDisabled () {
    const { params } = this.props.attribute;
    return params.type !== ATTRIBUTES_TYPES.STRING;
  }

  isFormatDisabled () {
    const { params } = this.props.attribute;
    return params.type !== ATTRIBUTES_TYPES.STRING;
  }
}

AttributeForm.propTypes = {
  attribute: PropTypes.shape({
    _id: PropTypes.string,
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
    }),
  }).isRequired,
  onChange: PropTypes.func,
  onRemove: PropTypes.func,
};

AttributeForm.defaultProps = {
  onChange () {},
  onRemove () {},
};
