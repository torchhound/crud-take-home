import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getArticle, editArticle } from '../actions/articleActions';

class FullArticle extends Component {
  constructor(props) {
    super(props);
    this.onEdit = this.onEdit.bind(this);
  }

  componentDidMount() {
    this.props.dispatchGetArticle(this.props.match.params.id);
  }

  onEdit() {
    this.props.dispatchEditArticle(document.getElementById('name').value, 
      document.getElementById('body').value,
      this.props.match.params.id);
  }

  render() {
    const { article } = this.props;
    return (
      <div className="FullArticle uk-text-center uk-text-middle">
        <form>
          <fieldset className="uk-fieldset">
            <div className="uk-margin">
              <input className="uk-input" id="name" type="text" defaultValue={article.name}/>
            </div>
            <div className="uk-margin">
              <input className="uk-input" id="body" type="text" defaultValue={article.body}/>
            </div>
             <button onClick={this.onEdit} className="uk-margin-small-right" type="button">Edit</button>
             <a href="/">Back</a>
          </fieldset>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchGetArticle: (id) => {
      dispatch(getArticle(id));
    },
    dispatchEditArticle: (name, body, id) => {
      dispatch(editArticle(name, body, id))
    }
  }
}

const mapStateToProps = state => {
  return { 
    article: state.articles.article
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FullArticle);
