import { AUTH, UNSET_USER, SET_GLOBAL } from './actionTypes'
import { setToken } from '../../utils/http'

import UserService from '../../services/UserService'

const userService = new UserService()

export const doLogout = () => (dispatch: any) => {
  dispatch({ type: SET_GLOBAL, payload: { isLoading: true } })
  userService.doLogout().finally(async () => {
    await setToken(false)
    dispatch({ type: AUTH, payload: { token: null } })
    dispatch({ type: UNSET_USER, payload: {} })
    dispatch({ type: SET_GLOBAL, payload: { isLoading: false } })
  })
}
