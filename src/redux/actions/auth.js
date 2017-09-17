import db from '../../storage/firebase'
import { AUTH } from '../constants/auth'

export function auth ({ email, password }) {
  return dispatch => {
    return dispatch({
      type: AUTH.START,
      async: db().auth.signInWithEmailAndPassword(email, password)
    })
  }
}
