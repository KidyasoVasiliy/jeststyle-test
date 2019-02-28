/**
 * Vendor
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Components
 */
import { Spinner } from '../Spinner';

/**
 * Styles
 */
import style from './style.module.css';

/** Component buttons is shared
 * @param {boolean} disabled
 * @param {function} onClick
 */
export const Button = ({
  disabled,
  onClick,
}) => {
  const content = disabled ? <Spinner /> : 'show more';

  return (
    <button
      className={style.button}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
};

Button.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
