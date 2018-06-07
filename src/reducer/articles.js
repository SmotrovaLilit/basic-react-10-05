import { Record } from 'immutable'
import {
  DELETE_ARTICLE,
  ADD_COMMENT,
  LOAD_ALL_ARTICLES,
  LOAD_ARTICLE,
  START,
  SUCCESS,
  LOAD_COMMENTS,
  FAIL
} from '../constants'
import { arrToMap } from './utils'

const ArticleModel = new Record({
  id: null,
  title: null,
  text: null,
  date: null,
  loading: false,
  comments: [],
  loadedComments: false,
  loadingComments: false,
  errorLoadingComments: null
})

const ReducerRecord = new Record({
  entities: arrToMap([], ArticleModel),
  loading: false,
  loaded: false,
  error: null
})

export default (state = new ReducerRecord(), action) => {
  const { type, payload, randomId, response } = action

  switch (type) {
    case DELETE_ARTICLE:
      return state.deleteIn(['entities', payload.id])

    case ADD_COMMENT:
      return state.updateIn(
        ['entities', payload.articleId, 'comments'],
        (comments) => comments.concat(randomId)
      )

    case LOAD_ALL_ARTICLES + START:
      return state.set('loading', true)

    case LOAD_ALL_ARTICLES + SUCCESS:
      return state
        .set('entities', arrToMap(response, ArticleModel))
        .set('loading', false)
        .set('loaded', true)

    case LOAD_ARTICLE + START:
      return state.setIn(['entities', payload.id, 'loading'], true)

    case LOAD_ARTICLE + SUCCESS:
      return state
        .setIn(['entities', payload.id], new ArticleModel(response))
        .set('loading', false)
        .set('loaded', true)

    case LOAD_COMMENTS + START:
      //return state.setIn(['entities', payload.articleId], new ArticleModel(response))
      return state.setIn(
        ['entities', payload.articleID, 'loadingComments'],
        true
      )

    case LOAD_COMMENTS + FAIL:
      return state.setIn(
        ['entities', payload.articleID, 'loadingComments'],
        false
      )

    case LOAD_COMMENTS + SUCCESS:
      //return state.setIn(['entities', payload.articleId], new ArticleModel(response))
      return state
        .setIn(['entities', payload.articleID, 'loadingComments'], false)
        .setIn(['entities', payload.articleID, 'loadedComments'], true)

    default:
      return state
  }
}
