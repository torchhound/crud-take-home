import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getArticle, editArticle } from '../actions/articleActions';

class FullArticle extends Component {
  constructor(props) {
    super(props);
    this.onEdit = this.onEdit.bind(this);
  }

  componentDidMount() {
    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const email = params !== undefined ? params.get('email') : "";
    this.props.dispatchGetArticle(this.props.match.params.id, email);
  }

  onEdit() {
    this.props.dispatchEditArticle(document.getElementById('name').value, 
      document.getElementById('body').value,
      this.props.match.params.id);
  }

  render() {
    const { article } = this.props;
    console.log(article);
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
        <h2>Views</h2>
        <p>To share this article via email send this link: {`<SERVICE_URL>/article/<ID>/?email=<EXAMPLE@EXAMPLE.COM>`}</p>
        {
          Object.keys(article).length === 0 ? <div></div> : 
            article.views.map(view => {
              return(
                <div>
                  <span className="uk-margin-small-right">{view.email}</span>
                  <span>{view.opens}</span>
                </div>
              )
            })
        }
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchGetArticle: (id, email) => {
      dispatch(getArticle(id, email));
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
