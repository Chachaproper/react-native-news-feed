import { UPDATE_NOTES, REMOVE_NOTE } from '../constants/data'

export function notes (state = [], action) {
  switch (action.type) {
    case UPDATE_NOTES:
      return [...action.payload]
    case REMOVE_NOTE:
      return [...action.payload]
    default:
      return state
  }
}
