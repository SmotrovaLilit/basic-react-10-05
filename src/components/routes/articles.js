import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ArticleList from '../article-list'
import Article from '../article'

class ArticlesPage extends Component {
  static propTypes = {}

  render() {
    console.log('--- articles page match', this.props.match)

    return (
      <div>
        <ArticleList />
        <Route path="/articles/:id" children={this.getArticle} />
      </div>
    )
  }

  getArticle = ({ match }) => {
    console.log('---', 'article match', match)
    return match ? (
      <Article id={match.params.id} key={match.params.id} isOpen />
    ) : (
      <h1>Please select an article</h1>
    )
  }
}

export default ArticlesPage
