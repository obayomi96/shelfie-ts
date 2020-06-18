import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'

import { getUser } from './store/actions/userActions'

import './assets/sass/app.scss'

import Sidebar from './components/Layout/Sidebar'
import Login from './pages/Auth/Login'
import Error404 from './pages/Errors/404'
import ProtectedRoute from './routes/ProtectedRoute'

import Analytics from './pages/Analytics'
import Dashboard from './pages/Dashboard'

interface IProps {
  getUser: () => void
  isLoading: boolean
  isAuthenticated: boolean
  sidebarOpen: boolean
}

const App: React.FunctionComponent<IProps> = ({
  getUser,
  isLoading,
  isAuthenticated,
  sidebarOpen,
}) => {
  useEffect(() => {
    getUser()
  }, [getUser, isAuthenticated])

  return (
    <BrowserRouter>
      <div className="appContainer">
        <Sidebar />

        <div
          className={`pageWrapper ${
            !isAuthenticated || !sidebarOpen ? 'full' : ''
          }`}
        >
          {!isLoading ? (
            <Switch>
              <ProtectedRoute exact component={Dashboard} path="/" />
              <ProtectedRoute exact component={Analytics} path="/analytics" />
              <Route exact path="/login" component={Login} />
              <Route component={Error404} />
            </Switch>
          ) : (
            <div className="d-flex justify-content-center py-5">
              <Spinner animation="border" />
            </div>
          )}
        </div>
      </div>
    </BrowserRouter>
  )
}

App.propTypes = {
  getUser: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  sidebarOpen: PropTypes.bool.isRequired,
}

App.defaultProps = {
  isLoading: true,
  isAuthenticated: false,
}

export default connect(
  (state: { auth: any; global: any }) => ({
    token: state.auth.token,
    isLoading: state.global.isLoading,
    isAuthenticated: !!state.auth.token,
    sidebarOpen: state.global.sidebarOpen,
  }),
  { getUser }
)(App)
