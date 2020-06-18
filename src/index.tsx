import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ToastProvider } from 'react-toast-notifications'

import App from './App'
import { store, persistor } from './store'

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading="Loading..." persistor={persistor}>
      <ToastProvider
        autoDismiss
        autoDismissTimeout={6000}
        placement="top-center"
      >
        <App />
      </ToastProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)
