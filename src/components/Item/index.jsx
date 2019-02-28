/**
 * Vendor
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Styles
 */
import style from './style.module.css';

/**
 * The component Item responsible for rendering data
 * @param {function} goToCard
 * @param {string} name
 * @param {string} image
 * @param {string} publisher
 * @param {number|string} issue
 */
export const Item = ({
  goToCard,
  name,
  image,
  publisher,
  issue,
}) => {
  const pressEnter = e => e.keyCode === 13 && goToCard();

  return (
    <div
      className={style.anchor}
      role="link"
      onKeyDown={pressEnter}
      tabIndex="0"
    >
      <div
        className={style.item}
        tabIndex="-1"
      >
        <div
          className={style.photo}
          onClick={goToCard}
          role="presentation"
        >
          <img src={image} alt={name} />
        </div>
        <div
          className={style.name}
          onClick={goToCard}
          role="presentation"
        >
          {name}
        </div>
        <div className={style.publishing}>{publisher}</div>
        <div className={style.issues}>{issue}</div>
      </div>
    </div>
  );
};

Item.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  publisher: PropTypes.string.isRequired,
  issue: PropTypes.number.isRequired,
  goToCard: PropTypes.func.isRequired,
};
