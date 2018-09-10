import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteArticle, duplicateArticle } from '../actions/articleActions';

class ArticleItem extends Component {
  constructor(props) {
    super(props);
    this.onTrash = this.onTrash.bind(this);
    this.onDuplicate = this.onDuplicate.bind(this);
  }

  onTrash() {
    this.props.dispatchDeleteArticle(this.props.id);
  }

  onDuplicate() {
    this.props.dispatchDuplicateArticle(this.props.id);
  }

  render() {
    return (
      <div className="ArticleItem uk-text-center uk-text-middle">
        <a href={`/article/${this.props.id}`} className="uk-margin-small-right">{this.props.name}</a>
        <button onClick={this.onTrash} className="uk-margin-small-right" uk-icon="trash"></button>
        <button onClick={this.onDuplicate} uk-icon="copy"></button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchDeleteArticle: (id) => {
      dispatch(deleteArticle(id));
    },
    dispatchDuplicateArticle: (id) => {
      dispatch(duplicateArticle(id));
    }
  }
}

export default connect(null, mapDispatchToProps)(ArticleItem);