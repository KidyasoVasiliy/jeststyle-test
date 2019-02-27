import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Header } from './components';
import { ListHeroes, CardHero } from './pages';

const App = () => {
  const renderCard = ({ match }) => <CardHero params={match.params} />;

  return (
    <Router>
      <Fragment>
        <Header />
        <Route exact path="/" component={ListHeroes} />
        <Route path="/card/:id" render={renderCard} />
      </Fragment>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
