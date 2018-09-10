import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserItem from './UserItem';
import { getAllUsers } from '../actions/userActions';

class Users extends Component {
  componentDidMount() {
    this.props.dispatchGetAllUsers();
  }

  render() {
    const { userList } = this.props

    return (
      <div className="Users uk-text-center uk-text-middle">
        <h2>Users</h2>
        <div>
          {userList.map((user) => {
            return (<UserItem name={user.username} />)
          })}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchGetAllUsers: () => {
      dispatch(getAllUsers());
    }
  }
}

const mapStateToProps = state => {
  return { 
    userList: state.users.userList
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
