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
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import Paper from 'material-ui/Paper';
import { ATTRIBUTES_TYPES, ATTRIBUTES_STRING_FORMATS } from 'client/consts';
import { vv, vvEnum } from './validation';

const fieldStyle = { width: '100%' };
const textFieldInputStyle = {};

export default class AttributeForm extends Component {

  constructor () {
    super(...arguments);

    this.state = {

      // If the form is toggled.
      isToggled: false,

      // The list of form errors.
      errors: {},

      // The current value to add in the enumeration list.
      enumeration: '',
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
                  disabled={this.isDefaultValueDisabled()}
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
                  {this.createFormats()}
                </SelectField>
              </Row>
            </Col>

          </Row>

          { this.isTypeStringNumber() && (
            <Row>

              {/* RANGE MIN */}
              <Col s={12} m={6}>
                <Row>
                  <TextField
                    style={fieldStyle}
                    inputStyle={textFieldInputStyle}
                    type='number'
                    name='rangeMin'
                    floatingLabelText='Range min'
                    hintText='Range minimum'
                    errorText={errors.rangeMin}
                    value={params.rangeMin}
                    onChange={ev => this.onChange('rangeMin', ev.target.value)}
                  />
                </Row>
              </Col>

              {/* RANGE MAX */}
              <Col s={12} m={6}>
                <Row>
                  <TextField
                    style={fieldStyle}
                    inputStyle={textFieldInputStyle}
                    type='number'
                    name='rangeMax'
                    floatingLabelText='Range max'
                    hintText='Range maximum'
                    errorText={errors.rangeMax}
                    value={params.rangeMax}
                    onChange={ev => this.onChange('rangeMax', ev.target.value)}
                  />
                </Row>
              </Col>

            </Row>
          ) }
          { this.isTypeStringNumber() && (
            <Row>

              {/* UNITS OF MEASUREMENT */}
              <Col s={12} m={4}>
                <Row>
                  <TextField
                    style={fieldStyle}
                    inputStyle={textFieldInputStyle}
                    type='text'
                    name='unitsOfMeasurement'
                    floatingLabelText='Units of Measurement'
                    hintText='UoM (eg. mm)'
                    errorText={errors.unitsOfMeasurement}
                    value={params.unitsOfMeasurement}
                    onChange={ev => this.onChange('unitsOfMeasurement', ev.target.value)}
                  />
                </Row>
              </Col>

              {/* PRECISION */}
              <Col s={12} m={4}>
                <Row>
                  <TextField
                    style={fieldStyle}
                    inputStyle={textFieldInputStyle}
                    type='number'
                    name='precision'
                    floatingLabelText='Precision'
                    hintText='Precision (eg. 0.5)'
                    errorText={errors.precision}
                    value={params.precision}
                    onChange={ev => this.onChange('precision', ev.target.value)}
                  />
                </Row>
              </Col>

              {/* ACCURACY */}
              <Col s={12} m={4}>
                <Row>
                  <TextField
                    style={fieldStyle}
                    inputStyle={textFieldInputStyle}
                    type='number'
                    name='accuracy'
                    floatingLabelText='Accuracy'
                    hintText='Accuracy (eg. 0.5)'
                    errorText={errors.accuracy}
                    value={params.accuracy}
                    onChange={ev => this.onChange('accuracy', ev.target.value)}
                  />
                </Row>
              </Col>

            </Row>
          ) }

          {this.createTypeStringNone()}

        </Paper>
      </form>
    );
  }

  /**
   * Create the formats select options.
   * @return {React}
   */
  createFormats () {
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
   * Create the elements when the type is STRING and the format is NONE.
   * @return {React}
   */
  createTypeStringNone () {

    const { params } = this.props.attribute;

    if (params.type !== ATTRIBUTES_TYPES.STRING
    || params.format !== ATTRIBUTES_STRING_FORMATS.NONE) return;

    const { enumeration } = this.state;

    // Validate the key.
    let { enumeration: enumError } = vvEnum.validate({ enumeration }) || {};

    // The key must not be duplicated.
    const isDuplicated = params.enum.find(el => el === enumeration);
    if (isDuplicated) {
      enumError = 'Enumeration key is duplicated.';
    }

    return (
      <Row>
        <Col s={12} m={4}>
          <TextField
            style={{ width: 'calc(100% - 100px)', marginRight: '5px' }}
            inputStyle={textFieldInputStyle}
            type='text'
            name='enum'
            floatingLabelText='Enumerations'
            hintText='Enter value'
            errorText={enumeration ? enumError : ''}
            value={enumeration}
            onChange={ev => this.setState({ enumeration: ev.target.value })}
          />
          <RaisedButton
            style={{ verticalAlign: 'top', marginTop: '30px' }}
            label='Add'
            disabled={!!enumError}
            onClick={this.onEnumAdd}
          />
        </Col>
        <Col s={12} m={8}>
          {params.enum.map(el => (
            <span key={el} style={{ display: 'inline-block', marginTop: '5px' }}>
              <Chip onRequestDelete={() => this.onEnumRemove(el)}>{el}</Chip>
            </span>
          ))}
        </Col>
      </Row>
    );
  }

  /**
   * On add enumeration. This happens when the user has already set an enumeration
   * to create but is not yet added.
   */
  onEnumAdd = () => {

    const { params } = this.props.attribute;
    const { enumeration } = this.state;

    if (!enumeration) return;

    this.setState({ enumeration: '' });

    const enumValue = [ ...params.enum, enumeration ];
    this.onChange('enum', enumValue);
  }

  /**
   * On remove enumeration from the list when it was already added.
   * @param  {String} key
   */
  onEnumRemove = (key) => {

    const { params } = this.props.attribute;
    const enumValue = params.enum.filter(el => el !== key);

    this.onChange('enum', enumValue);
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

    const params = this.normalize({
      ...attribute.params,
      [name]: value
    });

    let errors = vv.validate(params);
    const isValid = !duplicatedName && !errors;

    // If the name is duplicated, set it as a property name error.
    if (duplicatedName) {
      errors = errors || {};
      errors.name = "Attribute's name must be unique.";
    }

    const toUpdate = { _id: attribute._id, isValid, params };

    this.setState({ errors: errors || {} });

    this.props.onChange(toUpdate);
  }

  isDefaultValueDisabled () {
    const { params } = this.props.attribute;
    return params.type !== ATTRIBUTES_TYPES.STRING;
  }

  isFormatDisabled () {
    const { params } = this.props.attribute;
    return params.type !== ATTRIBUTES_TYPES.STRING;
  }

  isTypeStringNumber () {
    const { params } = this.props.attribute;
    return params.type === ATTRIBUTES_TYPES.STRING
    && params.format === ATTRIBUTES_STRING_FORMATS.NUMBER;
  }

  /**
   * Normalize a params object to update.
   * We set only the allowed properties with values in each case.
   * @param  {Object} params
   * @return {Object} - Mutated normalized version of received params.
   */
  normalize (params) {

    // If user changes and the type is different from STRING and the format is
    // different from NONE.
    if (params.type !== ATTRIBUTES_TYPES.STRING
    || params.format !== ATTRIBUTES_STRING_FORMATS.NONE) {
      params.enum = [];
    }

    // If user changes and the type is different from STRING and the format is
    // different from NUMBER.
    if (params.type !== ATTRIBUTES_TYPES.STRING
    || params.format !== ATTRIBUTES_STRING_FORMATS.NUMBER) {
      params.unitsOfMeasurement = '';
      params.rangeMin = '';
      params.rangeMax = '';
      params.precision = '';
      params.accuracy = '';
    }

    // If user changes the type to object.
    if (params.type === ATTRIBUTES_TYPES.OBJECT) {
      params.defaultValue = '';
      params.format = '';
    }

    return params;
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
