/**
 * Vendor
 */
import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

/**
 * Components
 */
import { Header, Copyright } from './components';
import { ListHeroes, CardHero, NoMatch } from './pages';

/**
 * Styles
 */
import './index.css';

const App = () => {
  // eslint-disable-next-line react/prop-types
  const renderCard = ({ match }) => <CardHero params={match.params} />;

  return (
    <Router>
      <Fragment>
        <Header />
        <Copyright />

        <Switch>
          <Route exact path="/" component={ListHeroes} />
          <Route exact path="/card/:id" render={renderCard} />
          <Route exact path="/404" component={NoMatch} />
          <Redirect to="/404" />
        </Switch>
      </Fragment>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
