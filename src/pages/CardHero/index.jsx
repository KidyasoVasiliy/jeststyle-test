/* eslint-disable no-underscore-dangle */
/**
 * Vendor
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * HOC
 */
import { withCatchEror } from '../../hoc/withCatchEror';

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

class CardHero extends Component {
  _isMounted = false

  getHero = new Comic()

  state = {
    loading: true,
    data: null,
  }

  async componentDidMount() {
    this._isMounted = true;
    const { params: { id } } = this.props;
    try {
      const data = await this.getHero.getCharacter(`${id}`);
      if (this._isMounted) {
        this.setState({ data, loading: false });
      }
    } catch (e) {
      /* NOTE: Specially cause an error in render to catch the error in hoc */
      this.setState({ data: null, loading: false });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { data, loading } = this.state;

    if (loading) return <Loading />;

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

export default withCatchEror(CardHero);
