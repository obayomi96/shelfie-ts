import { SET_GLOBAL } from './actionTypes'

export const setGlobal = (payload: any) => (dispatch: any) => {
  dispatch({
    type: SET_GLOBAL,
    payload,
  })
}
