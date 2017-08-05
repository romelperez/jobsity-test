import React from 'react';
import cx from 'classnames';
import Row from 'react-materialize/lib/Row';
import Col from 'react-materialize/lib/Col';

export default function Header (props) {

  const { className, ...etc } = props;
  const cls = cx('header', className);

  return (
    <div className={cls} {...etc}>
      <Row>
        <Col s={12}>
          <h1>Romel Pérez, Jobsity - Test</h1>
        </Col>
      </Row>
    </div>
  );
}
