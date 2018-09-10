export const ALL_ARTICLES_SUCCESS = 'ALL_ARTICLES_SUCCESS';
export const ALL_ARTICLES_FAILURE = 'ALL_ARTICLES_FAILURE';

export const ARTICLE_SUCCESS = 'ARTICLE_SUCCESS';
export const ARTICLE_FAILURE = 'ARTICLE_FAILURE';

export const allArticlesSuccess = (articles) => ({
  type: ALL_ARTICLES_SUCCESS,
  articles
});

export const allArticlesFailure = () => ({
  type: ALL_ARTICLES_FAILURE
});

export const articleSuccess = (article) => ({
  type: ALL_ARTICLES_SUCCESS,
  article
});

export const articleFailure = () => ({
  type: ALL_ARTICLES_FAILURE
});

export function getAllArticles() {
  return dispatch => {
    fetch('/api/articles/all', {
      method: 'get',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    }).then(res => {
        res.json().then(data => {
          dispatch(allArticlesSuccess(data));
        });
      })
      .catch(err => {
        dispatch(allArticlesFailure());
      });
  }
}

export function getArticle(id) {
  return dispatch => {
    fetch(`/api/articles/${id}`, {
      method: 'get',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    }).then(res => {
        res.json().then(data => {
          dispatch(articleSuccess(data));
        });
      })
      .catch(err => {
        dispatch(articleFailure());
      });
  }
}

export function postArticle(name, body) {
  return dispatch => {
    fetch('/api/articles/new', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'name': name, 'body': body})
    })
  }
}