import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import FullArticle from './components/FullArticle';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './actions/reducers';

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router>
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/article:id" component={FullArticle} />
        </Switch>
    </Router>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
