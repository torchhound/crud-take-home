export const ALL_USERS_SUCCESS = 'ALL_USERS_SUCCESS';
export const ALL_USERS_FAILURE = 'ALL_USERS_FAILURE';

export const allUsersSuccess = (users) => ({
  type: ALL_USERS_SUCCESS,
  users
});

export const allUsersFailure = () => ({
  type: ALL_USERS_FAILURE
});

export function getAllUsers() {
  return dispatch => {
    fetch('/api/users/all', {
      method: 'get',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    }).then(res => {
        res.json().then(data => {
          dispatch(allUsersSuccess(data));
        });
      })
      .catch(err => {
        dispatch(allUsersFailure());
      });
  }
}