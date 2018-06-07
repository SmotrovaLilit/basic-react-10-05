import { ADD_COMMENT, LOAD_COMMENTS, SUCCESS } from '../constants'
import { arrToMap } from './utils'
import { Record } from 'immutable'

const CommentModel = new Record({
  id: null,
  user: null,
  text: null
})

const ReducerRecord = new Record({
  entities: arrToMap([], CommentModel)
})

export default (state = new ReducerRecord(), action) => {
  const { type, payload, randomId, response } = action

  switch (type) {
    case ADD_COMMENT:
      return state.set(randomId, {
        ...payload.comment,
        id: randomId
      })

    case LOAD_COMMENTS + SUCCESS:
      return state.set(
        'entities',
        state.get('entities').merge(arrToMap(response, CommentModel))
      )

    default:
      return state
  }
}
