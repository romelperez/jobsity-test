import React from 'react';
import cx from 'classnames';
import Row from 'react-materialize/lib/Row';
import Col from 'react-materialize/lib/Col';

export default function Footer (props) {

  const { className, ...etc } = props;
  const cls = cx('footer', className);

  return (
    <div className={cls} {...etc}>
      <Row>
        <Col s={12}>
          <p>&copy; 2017 <a href='https://romelperez.com' target='romelperez'>Romel Pérez</a>, <a href='http://jobsity.com' target='jobsity'>Jobsity</a></p>
        </Col>
      </Row>
    </div>
  );
}
