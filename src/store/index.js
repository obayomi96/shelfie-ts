import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from './reducers'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
}

const persisitedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
  persisitedReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export const persistor = persistStore(store)
