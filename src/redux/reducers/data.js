import { ADD_NOTE, REMOVE_NOTE } from '../constants/data'

export function notes (state = [], action) {
  switch (action.type) {
    case ADD_NOTE:
      return [action.payload, ...state]
    case REMOVE_NOTE:
      return [...action.payload]
    default:
      return state
  }
}
