import { AUTH, SET_USER, SET_GLOBAL } from './actionTypes'
import UserService from '../../services/UserService'

import { setToken } from '../../utils/http'

const userService = new UserService()

/**
 * The only get user function needed in this app
 *
 * Sits on top of the user service to fetch a user
 * and assign permission
 */
export const getUser = () => async (
  dispatch: any,
  getState: any
): Promise<any> => {
  const user = getState().user
  const token = getState().auth.token
  await setToken(token)

  return new Promise((resolve) => {
    // Check if persisted token exists in authReducer

    if (token && !user._id) {
      // Set global loader
      dispatch({ type: SET_GLOBAL, payload: { isLoading: true } })

      userService
        .fetchUser(token)
        .then(async (user) => {
          await dispatch({
            type: SET_USER,
            payload: user,
          })
        })
        .catch(async () => {
          // On fail, just clear token to avoid repeat
          await dispatch({ type: AUTH, payload: { token: null } })
        })
        .finally(async () => {
          await dispatch({ type: SET_GLOBAL, payload: { isLoading: false } })
        })
    }
    resolve()
  })
}
