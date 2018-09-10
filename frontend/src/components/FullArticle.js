import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getArticle } from '../actions/articleActions';

class FullArticle extends Component {
  componentDidMount() {
    this.props.dispatchGetArticle(this.props.match.params.id);
  }

  render() {
    const { article } = this.props

    return (
      <div className="FullArticle uk-text-center uk-text-middle">
        <form>
          <fieldset className="uk-fieldset">
            <div className="uk-margin">
              <input className="uk-input" type="text" value={article.name}/>
            </div>
            <div class="uk-margin">
              <textarea class="uk-textarea" rows="5" value={article.body}></textarea>
            </div>
             <button type="button">Edit</button>
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
    }
  }
}

const mapStateToProps = state => {
  return { 
    article: state.articles.article
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FullArticle);
