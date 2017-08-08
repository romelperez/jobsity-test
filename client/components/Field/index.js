import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Row from 'react-materialize/lib/Row';
import Col from 'react-materialize/lib/Col';
import Button from 'react-materialize/lib/Button';
import Input from 'react-materialize/lib/Input';

import { TYPES, FORMATS } from 'client/consts';

export default class Field extends Component {

  constructor () {
    super(...arguments);
  }

  componentDidMount () {

    $(this.container).find('label').addClass('active');

    $(this.container).vulcanval({
      disableHTML5Validation: true,
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
        name: 'defaultTo',
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
  }

  render () {

    const { _id, isValid, params, onChange, className, ...etc } = this.props;
    const cls = cx('field', className);

    return (
      <form className={cls} ref={el => (this.container = el)} data-id={_id} {...etc}>
        <Row>

          {/* NAME */}
          <Col s={4}>
            <Row>
              <Input
                s={12}
                type='text'
                name='name'
                label='Name'
                placeholder='Enter a name'
                value={params.name}
                onChange={this.onChange}
                data-vv-display={`#f${_id}-name-display`}
              />
              <div id={`f${_id}-name-display`} />
            </Row>
          </Col>

          {/* DESCRIPTION */}
          <Col s={8}>
            <Row>
              <Input
                s={12}
                type='text'
                name='description'
                label='Description'
                placeholder='Enter a description for your new attribute'
                value={params.description}
                onChange={this.onChange}
                data-vv-display={`#f${_id}-description-display`}
              />
              <div id={`f${_id}-description-display`} />
            </Row>
          </Col>

        </Row>
        <Row>

          {/* DEVICE */}
          <Col s={4}>
            <Row>
              <Input
                s={12}
                type='select'
                name='device'
                label='Device Resource Type'
                placeholder='Default value'
                disabled
              />
            </Row>
          </Col>

          {/* DEFAULT TO */}
          <Col s={8}>
            <Row>
              <Input
                s={12}
                type='text'
                name='defaultTo'
                label='Default value'
                placeholder='Enter a default value'
                disabled={this.isDefaultToDisabled()}
                value={params.defaultTo}
                onChange={this.onChange}
                data-vv-display={`#f${_id}-defaultTo-display`}
              />
              <div id={`f${_id}-defaultTo-display`} />
            </Row>
          </Col>

        </Row>
        <Row>

          {/* DATA TYPE */}
          <Col s={4}>
            <Row>
              <Input
                s={12}
                type='select'
                name='type'
                label='Data Type'
                placeholder='Select the data type'
                value={params.type}
                onChange={this.onChange}
                data-vv-display={`#f${_id}-type-display`}
              >
                <option value={TYPES.STRING}>String</option>
                <option value={TYPES.OBJECT}>Object</option>
              </Input>
              <div id={`f${_id}-type-display`} />
            </Row>
          </Col>

          {/* FORMAT */}
          <Col s={8}>
            <Row>
              <Input
                s={12}
                type='select'
                name='format'
                label='Format'
                placeholder='Select the format'
                disabled={this.isFormatDisabled()}
                value={params.format}
                onChange={this.onChange}
                data-vv-display={`#f${_id}-format-display`}
              >
                {this.getFormats()}
              </Input>
              <div id={`f${_id}-format-display`} />
            </Row>
          </Col>

        </Row>
      </form>
    );
  }

  /**
   * On field property update.
   * @param  {Event} ev
   */
  onChange = (ev) => {

    const { name, value } = ev.target;
    const { _id, params } = this.props;
    const toUpdate = {
      _id,
      params: {
        ...params,
        [name]: value,
      }
    };

    // If user changes the type to object.
    if (name === 'type' && value === TYPES.OBJECT) {
      toUpdate.params.defaultTo = '';
      toUpdate.params.format = FORMATS.NONE;
    }

    this.props.onChange(toUpdate);
  }

  getFormats () {
    const { params } = this.props;
    if (params.type === TYPES.STRING) {
      return [
        <option key={FORMATS.NONE} value={FORMATS.NONE}>None</option>,
        <option key={FORMATS.NUMBER} value={FORMATS.NUMBER}>Number</option>,
        <option key={FORMATS.BOOLEAN} value={FORMATS.BOOLEAN}>Boolean</option>,
        <option key={FORMATS.DATETIME} value={FORMATS.DATETIME}>Date-Time</option>,
        <option key={FORMATS.CDATA} value={FORMATS.CDATA}>CDATA</option>,
        <option key={FORMATS.URI} value={FORMATS.URI}>URI</option>
      ];
    }
    return [
      <option key={FORMATS.NONE} value={FORMATS.NONE}>None</option>
    ];
  }

  isDefaultToDisabled () {
    const { params } = this.props;
    return params.type !== TYPES.STRING;
  }

  isFormatDisabled () {
    const { params } = this.props;
    return params.type !== TYPES.STRING;
  }
}

Field.propTypes = {
  _id: PropTypes.string.isRequired,
  isValid: PropTypes.bool,
  params: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    defaultTo: PropTypes.string,
    type: PropTypes.string,
    format: PropTypes.string,
  }),
  onChange: PropTypes.func,
};

Field.defaultProps = {
  params: {},
  onChange () {},
};
