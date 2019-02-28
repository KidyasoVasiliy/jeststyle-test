/**
 * Vendor
 */
import React from 'react';

/**
 * Styles
 */
import style from './style.module.css';

/**
 * Component Loading responsible for displaying the loading Button
 */
export const Spinner = () => (
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
