import './_index.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Row, Col } from 'react-flexbox-grid';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import Toggle from 'material-ui/Toggle';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

import { ATTRIBUTES_TYPES, ATTRIBUTES_STRING_FORMATS } from 'client/consts';
import normalize from 'client/tools/normalize';
import AttributeEnumeration from 'client/components/AttributeEnumeration';
import getFormats from './get-formats';
import makeValidator from './validator';

const fieldStyle = { width: '100%' };

export default class AttributeForm extends Component {

  constructor () {
    super(...arguments);

    this.state = {

      // If the form is toggled.
      isToggled: false,

      // The list of form errors. When empty object, no attribute errors.
      errors: {},
    };
  }

  componentWillMount () {

    // Create the validator with a method to get the list of names.
    this.validator = makeValidator({
      getNames: () => this.props.names
    });
  }

  componentDidUpdate () {

    // It's probably that the names have been updated so
    // we run the validation on the name.
    this.hasUpdated('name');
  }

  render () {

    const { attribute, names, onChange, onRemove, className, ...etc } = this.props;
    const { _id, params } = attribute;
    const { isToggled, errors } = this.state;
    const cls = cx('attribute-form', {
      'attribute-form--only-main-fields': isToggled
    }, className);

    return (
      <form className={cls} ref={el => (this.container = el)} data-id={_id} {...etc}>
        <Paper
          zDepth={1}
          className='attribute-form__paper'
          style={{ position: 'relative', marginBottom: '1rem', padding: '2rem 1.5rem 1.5rem' }}
        >

          {/* Remove */}
          <RaisedButton
            style={{ position: 'absolute', right: '1.5rem', top: '1rem' }}
            onClick={() => onRemove(_id)}
          >
            <i className='mdi mdi-delete' /> Remove
          </RaisedButton>

          {/* Toggle */}
          <div style={{ position: 'absolute', right: '150px', top: '1.5rem' }}>
            <Toggle
              defaultToggled={isToggled}
              onToggle={(ev, val) => this.setState({ isToggled: val })}
            />
          </div>

          <Row className='attribute-form__fields attribute-form__main-fields'>

            {/* NAME */}
            <Col xs={12} md={4}>
              <TextField
                style={fieldStyle}
                type='text'
                name='name'
                floatingLabelText='Name'
                hintText='Enter a name'
                errorText={errors.name}
                value={params.name}
                onChange={ev => this.onChange('name', ev.target.value)}
              />
            </Col>

            {/* DESCRIPTION */}
            <Col xs={12} md={8}>
              <TextField
                style={fieldStyle}
                type='text'
                name='description'
                floatingLabelText='Description'
                hintText='Enter a description for your new attribute'
                errorText={errors.description}
                value={params.description}
                onChange={ev => this.onChange('description', ev.target.value)}
              />
            </Col>

          </Row>
          <Row className='attribute-form__fields'>

            {/* DEVICE */}
            <Col xs={12} md={4}>
              <TextField
                style={fieldStyle}
                type='select'
                floatingLabelText='Device Resource Type'
                hintText='Default value'
                disabled
              />
            </Col>

            {/* DEFAULT VALUE */}
            <Col xs={12} md={8}>
              <TextField
                style={fieldStyle}
                type='text'
                name='defaultValue'
                floatingLabelText='Default value'
                hintText='Enter a default value'
                disabled={this.isDefaultValueDisabled()}
                errorText={errors.defaultValue}
                value={params.defaultValue}
                onChange={ev => this.onChange('defaultValue', ev.target.value)}
              />
            </Col>

          </Row>
          <Row className='attribute-form__fields'>

            {/* DATA TYPE */}
            <Col xs={12} md={4}>
              <SelectField
                style={fieldStyle}
                name='type'
                floatingLabelText='Data Type'
                errorText={errors.type}
                value={params.type}
                onChange={(ev, ind, value) => this.onChange('type', value)}
              >
                <MenuItem value={ATTRIBUTES_TYPES.STRING} primaryText='String' />
                <MenuItem value={ATTRIBUTES_TYPES.OBJECT} primaryText='Object' />
              </SelectField>
            </Col>

            {/* FORMAT */}
            <Col xs={12} md={8}>
              <SelectField
                style={fieldStyle}
                name='format'
                floatingLabelText='Format'
                disabled={this.isFormatDisabled()}
                errorText={errors.format}
                value={params.format}
                onChange={(ev, ind, value) => this.onChange('format', value)}
              >
                {getFormats(params.type)}
              </SelectField>
            </Col>

          </Row>

          {this.createTypeStringNumber()}

          {this.createTypeStringNone()}

        </Paper>
      </form>
    );
  }

  /**
   * Create the elements when the type is STRING and the format is NUMBER.
   * @return {React}
   */
  createTypeStringNumber () {

    const { params } = this.props.attribute;
    const { errors } = this.state;

    if (params.type !== ATTRIBUTES_TYPES.STRING
    || params.format !== ATTRIBUTES_STRING_FORMATS.NUMBER) {
      return;
    }

    return (
      <div>
        <Row className='attribute-form__fields'>

          {/* RANGE MIN */}
          <Col xs={12} md={6}>
            <TextField
              style={fieldStyle}
              type='number'
              name='rangeMin'
              floatingLabelText='Range min'
              hintText='Range minimum'
              errorText={errors.rangeMin}
              value={params.rangeMin}
              onChange={ev => this.onChange('rangeMin', ev.target.value)}
            />
          </Col>

          {/* RANGE MAX */}
          <Col xs={12} md={6}>
            <TextField
              style={fieldStyle}
              type='number'
              name='rangeMax'
              floatingLabelText='Range max'
              hintText='Range maximum'
              errorText={errors.rangeMax}
              value={params.rangeMax}
              onChange={ev => this.onChange('rangeMax', ev.target.value)}
            />
          </Col>

        </Row>
        <Row className='attribute-form__fields'>

          {/* UNITS OF MEASUREMENT */}
          <Col xs={12} md={4}>
            <TextField
              style={fieldStyle}
              type='text'
              name='unitsOfMeasurement'
              floatingLabelText='Units of Measurement'
              hintText='UoM (eg. mm)'
              errorText={errors.unitsOfMeasurement}
              value={params.unitsOfMeasurement}
              onChange={ev => this.onChange('unitsOfMeasurement', ev.target.value)}
            />
          </Col>

          {/* PRECISION */}
          <Col xs={12} md={4}>
            <TextField
              style={fieldStyle}
              type='number'
              name='precision'
              floatingLabelText='Precision'
              hintText='Precision (eg. 0.5)'
              errorText={errors.precision}
              value={params.precision}
              onChange={ev => this.onChange('precision', ev.target.value)}
            />
          </Col>

          {/* ACCURACY */}
          <Col xs={12} md={4}>
            <TextField
              style={fieldStyle}
              type='number'
              name='accuracy'
              floatingLabelText='Accuracy'
              hintText='Accuracy (eg. 0.5)'
              errorText={errors.accuracy}
              value={params.accuracy}
              onChange={ev => this.onChange('accuracy', ev.target.value)}
            />
          </Col>

        </Row>
      </div>
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

    return (
      <AttributeEnumeration
        className='attribute-form__fields'
        value={params.enum}
        onChange={value => this.onChange('enum', value)}
      />
    );
  }

  /**
   * On attribute property update.
   * @param  {String} name
   * @param  {*} value
   */
  onChange = (name, value) => {

    const { attribute } = this.props;
    const params = normalize({ ...attribute.params, [name]: value });
    const toUpdate = { _id: attribute._id, params };

    this.props.onChange(toUpdate);
    setTimeout(() => this.hasUpdated(name), 0);
  }

  /**
   * On attribute property updated. Run the validation of the attribute's data.
   * @param  {String} name - THe name of the property that updated.
   */
  hasUpdated (name) {

    const { attribute } = this.props;
    const errors = this.validator.validate(attribute.params);
    const error = (errors || {})[name];
    const isValid = !errors;

    if (this.state.errors[name] !== error) {
      const isToggled = !isValid ? false : this.state.isToggled;
      this.setState({ errors: errors || {}, isToggled });
    }

    if (attribute.isValid !== isValid) {
      const toUpdate = { ...attribute, isValid };
      this.props.onChange(toUpdate);
    }
  }

  isDefaultValueDisabled () {
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
  names: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  onRemove: PropTypes.func,
};

AttributeForm.defaultProps = {
  names: [],
  onChange () {},
  onRemove () {},
};
