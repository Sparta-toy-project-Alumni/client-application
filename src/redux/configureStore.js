import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { connectRouter } from 'connected-react-router';

import Post from './modules/post';
import User from './modules/user';
import Location from './modules/loc';
import Search from './modules/search';
import Chat from './modules/chat';
import Image from './modules/image';
import Main from './modules/main';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  chat: Chat,
  user: User,
  post: Post,
  loc: Location,
  search: Search,
  image: Image,
  main: Main,
  router: connectRouter(history),
});

const middlewares = [thunk.withExtraArgument({ history: history })];

// 지금이 어느 환경인 지
const env = process.env.NODE_ENV;

// 개발환경에서는 로거
if (env === 'development') {
  const { logger } = require('redux-logger');
  middlewares.push(logger);
}

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();
