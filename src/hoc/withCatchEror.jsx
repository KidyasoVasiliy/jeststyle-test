/**
 * Vendor
 */
import React, { Component } from 'react';

/**
 * Components
 */
import { Error } from '../components';

/**
 *  Hight Order Component to catch errors in child components.
 *  Show error to user.
 * @param {function} WrappedComponent
 */
export const withCatchEror = WrappedComponent => class extends Component {
  state = { hasError: false };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    const { hasError } = this.state;
    if (hasError) {
      return <Error />;
    }

    return <WrappedComponent {...this.props} />;
  }
};
