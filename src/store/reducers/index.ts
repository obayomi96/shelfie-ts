import { combineReducers } from 'redux'
import authReducer from './authReducer'
import globalReducer from './globalReducer'
import userReducer from './userReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  global: globalReducer,
  user: userReducer,
})

export default rootReducer
