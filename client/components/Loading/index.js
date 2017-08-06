import React from 'react';
import cx from 'classnames';

export default function Loading (props) {

  const { className, ...etc } = props;
  const cls = cx('loading', className);

  return (
    <div className={cls} {...etc}>
      <div className='loading__el' />
    </div>
  );
}
