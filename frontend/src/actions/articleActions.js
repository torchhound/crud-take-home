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
  type: ARTICLE_SUCCESS,
  article
});

export const articleFailure = () => ({
  type: ARTICLE_FAILURE
});

export function getAllArticles() {
  return dispatch => {
    fetch('/api/articles/all', {
      method: 'get',
      headers: {
        'Accept': 'application/json, text/plain, */*'
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

export function getArticle(id, email = "") {
  return dispatch => {
    const baseUrl = `/api/articles/${id}`;
    const compositeUrl = email === "" || email === null ? baseUrl : `${baseUrl}?email=${email}`;
    fetch(compositeUrl, {
      method: 'get',
      headers: {
        'Accept': 'application/json, text/plain, */*'
      }
    }).then(res => {
        console.log(res);
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

export function deleteArticle(id) {
  return dispatch => {
    fetch(`/api/articles/delete/${id}`, {
      method: 'delete',
      headers: {
        'Accept': 'application/json, text/plain, */*'
      }
    })
  }
}

export function duplicateArticle(id) {
  return dispatch => {
    fetch(`/api/articles/duplicate/${id}`, {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*'
      }
    })
  }
}

export function editArticle(name, body, id) {
  return dispatch => {
    fetch(`/api/articles/edit/${id}`, {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'name': name, 'body': body})
    })
  }
}