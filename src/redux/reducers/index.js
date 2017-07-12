import { combineReducers } from 'redux'
import { NavigationActions } from 'react-navigation'
import { reducer as form } from 'redux-form'


const AppReducer = combineReducers({ form })

export default AppReducer
