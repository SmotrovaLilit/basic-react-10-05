import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {
  filtratedArticlesSelector,
  loadingArticlesSelector
} from '../selectors'
import { loadAllArticles } from '../ac'
import Loader from './common/loader'

export class ArticleList extends Component {
  static propTypes = {
    articles: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props)
    props.fetchData && props.fetchData()
  }

  render() {
    const { articles, loading } = this.props
    if (loading) return <Loader />

    const articleElements = articles.map((article) => (
      <li key={article.id} className="test__article-list_item">
        <NavLink to={`/articles/${article.id}`} activeStyle={{ color: 'red' }}>
          {article.title}
        </NavLink>
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
)(ArticleList)
