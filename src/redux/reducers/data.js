import {
  UPDATE_NOTES, REMOVE_NOTE, CHANGE_NETWORK,
  ADD_TRANSACTION, REMOVE_TRANSACTION
} from '../constants/data'

export function notes (state = [], action) {
  switch (action.type) {
    case UPDATE_NOTES:
    case REMOVE_NOTE:
      return [...action.payload]
    default:
      return state
  }
}

export function network (state = false, action) {
  switch (action.type) {
    case CHANGE_NETWORK:
      return action.payload
    default:
      return state
  }
}

export function transactions (state = [], action) {
  switch (action.type) {
    case ADD_TRANSACTION:
    case REMOVE_TRANSACTION:
      return [...action.payload]
    default:
      return state
  }
}
