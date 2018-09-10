import { combineReducers } from 'redux';
import { ALL_USERS_SUCCESS, ALL_USERS_FAILURE } from './userActions';
import { ALL_ARTICLES_SUCCESS, ALL_ARTICLES_FAILURE,
    ARTICLE_SUCCESS, ARTICLE_FAILURE } from './articleActions';

const initialState = {
  users: {
    userList: []
  },
  articles: {
    articleList: [],
    article: {}
  }
}

function users(state = initialState.users, action) {
  switch(action.type) {
    case ALL_USERS_SUCCESS:
      return{
        ...state,
        userList: action.users
      }
    case ALL_USERS_FAILURE:
      return state;
    default:
      return state;
  }
}

function articles(state = initialState.articles, action) {
  switch(action.type) {
    case ALL_ARTICLES_SUCCESS:
      return{
        ...state,
        articleList: action.articles
      }
    case ALL_ARTICLES_FAILURE:
      return state;
    case ARTICLE_SUCCESS:
      return{
        ...state,
        article: action.article
      }
    case ARTICLE_FAILURE:
      return state;
    default:
      return state;
  }
}

const reducers = combineReducers({
  users,
  articles
});

export default reducers;