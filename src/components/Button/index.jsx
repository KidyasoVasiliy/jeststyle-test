/**
 * Vendor
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Styles
 */
import style from './style.module.css';

const Spinner = () => (
  <div className={style.spinner}>
    <span>Loading...</span>
    <img
      className={style.image}
      src={`${process.env.PUBLIC_URL}/assets/spinner.svg`}
      alt="spinner"
      width="40"
      height="40"
    />
  </div>
);

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
    >
      {content}
    </button>
  );
};

Button.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
