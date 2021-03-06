/**
 * Vendor
 */
import React from 'react';

/**
 * Styles
 */
import style from './style.module.css';

/**
 * Component Loading responsible for displaying the loading element
 */
export const Loading = () => (
  <div className={style.loading}>
    <img
      src={`${process.env.PUBLIC_URL}/assets/spinner.svg`}
      alt="loading"
      width="200"
      height="200"
    />
  </div>
);
