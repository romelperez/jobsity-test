import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Row from 'react-materialize/lib/Row';
import Col from 'react-materialize/lib/Col';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import validator from './validator';

export default class AttributeFormStringNone extends Component {

  constructor () {
    super(...arguments);

    this.state = {
      enumeration: ''
    };
  }

  render () {

    const { value, className } = this.props;
    const { enumeration } = this.state;

    // Validate the key.
    let { enumeration: enumError } = validator.validate({ enumeration }) || {};

    // The key must not be duplicated.
    const isDuplicated = value.find(el => el === enumeration);
    if (isDuplicated) {
      enumError = 'Enumeration key is duplicated.';
    }

    return (
      <Row className={className}>
        <Col s={12} m={6}>
          <TextField
            style={{ width: 'calc(100% - 100px)', marginRight: '5px' }}
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
        <Col s={12} m={6}>
          {value.map(el => (
            <span key={el} style={{ display: 'inline-block', margin: '5px 5px 0 0' }}>
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

    const { value, onChange } = this.props;
    const { enumeration } = this.state;

    if (!enumeration) return;

    this.setState({ enumeration: '' });

    const enumValue = [ ...value, enumeration ];
    onChange(enumValue);
  }

  /**
   * On remove enumeration from the list when it was already added.
   * @param  {String} key
   */
  onEnumRemove = (key) => {

    const { value, onChange } = this.props;
    const enumValue = value.filter(el => el !== key);

    onChange(enumValue);
  }
}

AttributeFormStringNone.propTypes = {
  value: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
};

AttributeFormStringNone.defaultProps = {
  value: [],
  onChange: function () {},
};
