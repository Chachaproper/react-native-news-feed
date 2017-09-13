import { AUTH, LOGOUT } from '../constants/auth'

const initialState = { user: null, isAuth: false }

export function auth (state = initialState, action) {
  switch (action.type) {
    case AUTH.SUCCESS:
      return { ...state, user: action.resp, isAuth: true }
    case LOGOUT:
      return { ...initialState }
    default:
      return state
  }
}
