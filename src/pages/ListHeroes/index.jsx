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
  getHeroes = new Comic();

  state = {
    items: [],
    loading: false,
  };

  componentDidMount = () => {
    this.getHeroes.getCharacters().then(items => this.setState({ items }));
  };

  showMore = () => {
    this.setState(() => ({ loading: true }));
    this.getHeroes.getMoreCharacters().then((newItems) => {
      const { items } = this.state;
      const current = [...items].concat(newItems);
      this.setState({ items: current, loading: false });
    });
  };

  // TODO:
  /*
    Can't perform a React state update on an unmounted component.
    This is a no-op, but it indicates a memory leak in your application.
    To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
      in ListHeroes (created by Route)
  */

  render() {
    const { items, loading } = this.state;
    const { history } = this.props;

    if (!items.length) return <Loading />;

    return (
      <main className="container">
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
