import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'remote-redux-devtools'
import appReducer from './reducers'
import asyncActionsMiddleware from './middleware/asyncActions'

export default createStore(
  appReducer,
  composeWithDevTools(
    applyMiddleware(
      thunk,
      asyncActionsMiddleware
    )
  )
)
