/**
 * Vendor
 */
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Styles
 */
import style from './style.module.css';

/**
 * Component Header is shared for ListPage and CardPage
 */
export const Header = () => (
  <header className={style.header}>
    <div className={style.container}>
      <Link
        to="/"
        role="link"
        tabIndex="0"
      >
        <img src={`${process.env.PUBLIC_URL}/assets/logo.svg`} alt="logo" />
      </Link>
    </div>
  </header>
);
