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

const fieldStyle = { width: '100%' };
const textFieldInputStyle = {};

export default class AttributeForm extends Component {

  constructor () {
    super(...arguments);
  }

  render () {

    const { _id, isValid, params, onChange, onRemove, className, ...etc } = this.props;
    const cls = cx('attribute-form', className);

    const errorName = '';

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
                  value={params.name}
                  onChange={ev => this.onChange('name', ev.target.value)}
                  data-vv-display={`#f${_id}-name-display`}
                />
                <div id={`f${_id}-name-display`} />
                { !!errorName && <div className='vv-display vv-display_error'>{errorName}</div> }
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
                  value={params.description}
                  onChange={ev => this.onChange('description', ev.target.value)}
                  data-vv-display={`#f${_id}-description-display`}
                />
                <div id={`f${_id}-description-display`} />
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

            {/* DEFAULT TO */}
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
                  value={params.defaultValue}
                  onChange={ev => this.onChange('defaultValue', ev.target.value)}
                  data-vv-display={`#f${_id}-defaultValue-display`}
                />
                <div id={`f${_id}-defaultValue-display`} />
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
                  value={params.type}
                  onChange={(ev, ind, value) => this.onChange('type', value)}
                  data-vv-display={`#f${_id}-type-display`}
                >
                  <MenuItem value={ATTRIBUTES_TYPES.STRING} primaryText='String' />
                  <MenuItem value={ATTRIBUTES_TYPES.OBJECT} primaryText='Object' />
                </SelectField>
                <div id={`f${_id}-type-display`} />
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
                  value={params.format}
                  onChange={(ev, ind, value) => this.onChange('format', value)}
                  data-vv-display={`#f${_id}-format-display`}
                >
                  {this.getFormats()}
                </SelectField>
                <div id={`f${_id}-format-display`} />
              </Row>
            </Col>

          </Row>
        </Paper>
      </form>
    );
  }

  getFormats () {
    const { params } = this.props;
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

    const { _id, params, names } = this.props;

    // TODO:
    // Validate field's name duplicity.
    /*const fieldName = name === 'name' ? value : params.name;
    const duplicatedName = !!names.
      filter(el => el._id !== _id).
      find(el => el.name === fieldName);*/
    const duplicatedName = false;

    // Field is valid if does not have name duplicity or all the fields are valid.
    const isValid = false; //!duplicatedName && !$(this.container).vulcanval('inspect');
    const toUpdate = {
      _id,
      isValid,
      params: {
        ...params,
        [name]: value,
      }
    };

    // If user changes the type to object.
    if (name === 'type' && value === ATTRIBUTES_TYPES.OBJECT) {
      toUpdate.params.defaultTo = '';
      toUpdate.params.format = '';
    }

    /*this.setState({
      errorName: duplicatedName ? "Field's name is duplicated." : ''
    });*/

    this.props.onChange(toUpdate);
  }

  isDefaultToDisabled () {
    const { params } = this.props;
    return params.type !== ATTRIBUTES_TYPES.STRING;
  }

  isFormatDisabled () {
    const { params } = this.props;
    return params.type !== ATTRIBUTES_TYPES.STRING;
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
  onRemove: PropTypes.func,
};

AttributeForm.defaultProps = {
  isValid: false,
  onChange () {},
  onRemove () {},
};
