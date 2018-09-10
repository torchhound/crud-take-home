import React, { Component } from 'react';

class UserItem extends Component {
  render() {
    return (
      <div className="UserItem uk-text-center uk-text-middle">
        <span className="uk-margin-small-right" uk-icon="user"></span>
        <span>{this.props.name}</span>
      </div>
    );
  }
}

export default UserItem;