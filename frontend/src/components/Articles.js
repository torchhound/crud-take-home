import React, { Component } from 'react';
import { connect } from 'react-redux';
import ArticleItem from './ArticleItem';
import { getAllArticles, postArticle } from '../actions/articleActions';

class Articles extends Component {
  constructor(props) {
    super(props);
    this.onNewSubmit = this.onNewSubmit.bind(this);
  }

  componentDidMount() {
    this.props.dispatchGetAllArticles();
  }

  onNewSubmit() {
    this.props.dispatchPostArticle(document.getElementById('name').value, 
      document.getElementById('body').value);
    this.props.dispatchGetAllArticles();
  }

  render() {
    const { articleList } = this.props

    return (
      <div className="Articles uk-text-center uk-text-middle">
        <h2>Articles</h2>
        <form>
          <fieldset className="uk-fieldset">
            <div className="uk-margin">
              <input className="uk-input" type="text" id="name" placeholder="Name"/>
            </div>
            <div class="uk-margin">
              <textarea class="uk-textarea" rows="5" id="body" placeholder="Body"></textarea>
            </div>
             <button type="button" onClick={this.onNewSubmit}>New</button>
          </fieldset>
        </form>
        <div>
          {articleList.map((article) => {
            return (<ArticleItem name={article.name} href={`/article/${article.id}`} />)
          })}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchGetAllArticles: () => {
      dispatch(getAllArticles());
    },
    dispatchPostArticle: (name, body) => {
      dispatch(postArticle(name, body));
    }
  }
}

const mapStateToProps = state => {
  return { 
    articleList: state.articles.articleList
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Articles);
