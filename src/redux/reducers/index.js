import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import recycleState from 'redux-recycle'
import { auth } from './auth'
import { notes, network, transactions } from './data'
import { LOGOUT } from '../../constants/navigation'

const AppReducer = combineReducers({
  form: recycleState(form, [LOGOUT]),
  auth: recycleState(auth, [LOGOUT]),
  notes: recycleState(notes, [LOGOUT]),
  network: recycleState(network, [LOGOUT]),
  transactions: recycleState(transactions, [LOGOUT])
})

export default AppReducer
