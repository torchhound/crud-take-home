import React, { Component } from 'react';

class ArticleItem extends Component {
  render() {
    return (
      <div className="ArticleItem uk-text-center uk-text-middle">
        <span className="uk-margin-small-right">{this.props.name}</span>
        <button className="uk-margin-small-right" uk-icon="trash"></button>
        <button uk-icon="copy"></button>
      </div>
    );
  }
}

export default ArticleItem;