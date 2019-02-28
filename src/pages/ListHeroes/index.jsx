/* eslint-disable no-underscore-dangle */
/**
 * Vendor
 */
import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';

/**
 * HOC
 */
import { withCatchEror } from '../../hoc/withCatchEror';

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

class ListHeroes extends Component {
  _isMounted = false;

  getHeroes = new Comic();

  state = {
    items: null,
    loading: true,
    loadingBtn: false,
  };

  async componentDidMount() {
    this._isMounted = true;

    try {
      const items = await this.getHeroes.getCharacters();
      if (this._isMounted) {
        this.setState({ items, loading: false });
      }
    } catch (e) {
      /* NOTE: Specially cause an error in render to catch the error in hoc */
      this.setState({ items: null, loading: false });
    }
  }


  componentWillUnmount() {
    this._isMounted = false;
  }

  showMore = () => {
    this.setState(() => ({ loadingBtn: true }));
    this.getHeroes.getMoreCharacters().then((newItems) => {
      const { items } = this.state;
      const current = [...items].concat(newItems);
      this.setState({ items: current, loadingBtn: false });
    });
  };

  render() {
    const { items, loading, loadingBtn } = this.state;
    const { history } = this.props;

    if (loading) return <Loading />;

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
            disabled={loadingBtn}
          />
        </div>
      </main>
    );
  }
}

ListHeroes.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default withCatchEror(ListHeroes);
