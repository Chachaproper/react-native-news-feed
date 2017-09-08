import { AUTH } from '../constants/auth'

const initialState = { user: null }

export function auth (state = initialState, action) {
  switch (action.type) {
    case AUTH.SUCCESS:
      return { ...state, user: action.resp }
    default:
      return state
  }
}
