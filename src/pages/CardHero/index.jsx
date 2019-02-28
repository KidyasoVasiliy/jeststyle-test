/* eslint-disable no-underscore-dangle */
/**
 * Vendor
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Components
 */
import { Loading } from '../../components';

/**
 * Services
 */
import { Comic } from '../../services/api';

/**
 * Styles
 */
import style from './style.module.css';

export class CardHero extends Component {
  _isMounted = false

  getHero = new Comic()

  state = {
    data: null,
  }

  componentDidMount() {
    this._isMounted = true;
    const { params: { id } } = this.props;
    this.getHero.getCharacter(`${id}`).then((data) => {
      if (this._isMounted) {
        this.setState({ data });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { data } = this.state;

    if (!data) return <Loading />;

    const {
      image,
      name,
      fields,
      description,
    } = data;

    return (
      <main className={style.container}>
        <img className={style.image} src={image} alt={name} />

        <div className={style.fields}>
          <h1 className={style.title}>{name}</h1>
          <table>
            <tbody>

              {fields.map(({ id, title, current }) => (
                <tr key={id}>
                  <td className={style.label}>{title}</td>
                  <td className={style.current}>{current}</td>
                </tr>
              ))}

            </tbody>
          </table>
          <p className={style.description}>{description}</p>
        </div>
      </main>
    );
  }
}

CardHero.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};
