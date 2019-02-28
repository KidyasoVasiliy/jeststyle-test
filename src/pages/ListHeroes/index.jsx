/* eslint-disable no-underscore-dangle */
/**
 * Vendor
 */
import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';

/**
 * Components
 */
import { Item, Button, Loading } from '../../components';

/**
 * Services
 */
import { Comic } from '../../services/api';

/**
 * Styles
 */
import style from './style.module.css';

export class ListHeroes extends Component {
  _isMounted = false;

  getHeroes = new Comic();

  state = {
    items: [],
    loading: false,
  };

  componentDidMount = () => {
    this._isMounted = true;
    this.getHeroes.getCharacters().then((items) => {
      if (this._isMounted) {
        this.setState({ items });
      }
    });
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  showMore = () => {
    this.setState(() => ({ loading: true }));
    this.getHeroes.getMoreCharacters().then((newItems) => {
      const { items } = this.state;
      const current = [...items].concat(newItems);
      this.setState({ items: current, loading: false });
    });
  };

  render() {
    const { items, loading } = this.state;
    const { history } = this.props;

    if (!items.length) return <Loading />;

    return (
      <main className={style.container}>
        <div className={style.grid}>
          {items.map(({ id, characterId, ...otherProps }) => {
            const goToCard = () => {
              history.push(`/card/${characterId}`);
            };

            return <Item key={id} goToCard={goToCard} {...otherProps} />;
          })}
        </div>
        <div className={style.controll}>
          <Button
            onClick={this.showMore}
            disabled={loading}
          />
        </div>
      </main>
    );
  }
}

ListHeroes.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};
