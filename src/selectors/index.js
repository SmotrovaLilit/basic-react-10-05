import { createSelector } from 'reselect'

const idSelector = (_, props) => props.id

export const articlesMapSelector = (state) => state.articles.entities
export const articleSelector = createSelector(
  articlesMapSelector,
  idSelector,
  (articles, id) => articles.get(id)
)

export const articleListSelector = createSelector(
  articlesMapSelector,
  (articlesMap) => articlesMap.valueSeq().toArray()
)

export const loadingArticlesSelector = (state) => state.articles.loading

const filtersSelector = (state) => state.filters
const commentMapSelector = (state) => state.comments.entities

export const filtersSelectionSelector = createSelector(
  filtersSelector,
  (filters) => filters.selected
)

export const filtratedArticlesSelector = createSelector(
  articleListSelector,
  filtersSelector,
  (articles, filters) => {
    const {
      selected,
      dateRange: { from, to }
    } = filters

    return articles.filter((article) => {
      const published = Date.parse(article.date)
      return (
        (!selected.length ||
          selected.find((selected) => selected.value === article.id)) &&
        (!from || !to || (published > from && published < to))
      )
    })
  }
)

export const createCommentSelector = () => {
  return createSelector(commentMapSelector, idSelector, (comments, id) => {
    return comments.get(id)
  })
}
