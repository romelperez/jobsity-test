import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

/**
 * Application container.
 */
export default function Wrapper (props) {

  const { referi, anim, complete, className, children, ...etc } = props;
  const cls = cx('wrapper', {
    'wrapper--anim': anim,
    'wrapper--complete': complete,
  }, className);

  return (
    <div className={cls} {...etc} ref={referi}>
      {children}
    </div>
  );
}

Wrapper.propTypes = {
  anim: PropTypes.bool,
  complete: PropTypes.bool,
  referi: PropTypes.func,
};

Wrapper.defaultProps = {
  anim: true,
  complete: false,
  referi () {},
};


/**
 * Application Container content.
 */
export function WrapperContent (props) {

  const { node, className, children, ...etc } = props;
  const cls = cx('wrapper__content', className);

  return (
    React.createElement(node, { className: cls, ...etc }, (
      children
    ))
  );
}

WrapperContent.propTypes = {
  node: PropTypes.string,
};

WrapperContent.defaultProps = {
  node: 'div',
};
