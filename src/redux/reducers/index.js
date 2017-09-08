import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { auth } from './auth'
import { notes } from './data'

const AppReducer = combineReducers({ form, auth, notes })

export default AppReducer
