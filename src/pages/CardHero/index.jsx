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
  getHero = new Comic();

  state = {
    data: null,
  };

  componentDidMount() {
    const { params: { id } } = this.props;
    this.getHero.getCharacter(`${id}`).then(data => this.setState({ data }));
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
          <h1 className={style.title}>{name || 'not known'}</h1>
          <table>
            <tbody>

              {fields.map(({ id, title, current }) => (
                <tr key={id}>
                  <td className={style.label}>{title}</td>
                  <td className={style.current}>{current || 'not known'}</td>
                </tr>
              ))}

            </tbody>
          </table>
          <p className={style.description}>{description || 'not known'}</p>
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
