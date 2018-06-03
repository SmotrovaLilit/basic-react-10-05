import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Article from './article'
import accordion from '../decorators/accordion'
import {
  filtratedArticlesSelector,
  loadingArticlesSelector
} from '../selectors'
import { loadAllArticles } from '../ac'
import Loader from './common/loader'

export class ArticleList extends Component {
  static propTypes = {
    articles: PropTypes.array.isRequired,

    //from accordion decorator
    openItemId: PropTypes.string,
    toggleItem: PropTypes.func
  }

  constructor(props) {
    super(props)
    props.fetchData && props.fetchData()
  }

  render() {
    const { articles, loading, openItemId, toggleOpenItem } = this.props
    if (loading) return <Loader />

    const articleElements = articles.map((article) => (
      <li key={article.id} className="test__article-list_item">
        <Article
          article={article}
          isOpen={article.id === openItemId}
          toggleOpen={toggleOpenItem}
        />
      </li>
    ))

    return <ul>{articleElements}</ul>
  }
}

export default connect(
  (state) => ({
    articles: filtratedArticlesSelector(state),
    loading: loadingArticlesSelector(state)
  }),
  { fetchData: loadAllArticles }
)(accordion(ArticleList))
