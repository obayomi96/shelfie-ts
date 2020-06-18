import React from 'react'
import { AUTH, DEAUTH } from '../actions/actionTypes'
import { IAuth as IState } from '../../interfaces/auth'

// enum ActionType {
//   Auth = 'increment',
//   Decrement = 'decrement'
// }

interface IAction {
  type: string
  payload: {
    token: string
  }
}

const initialState: IState = { token: null, user: {} }

const authReducer: React.Reducer<IState, IAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case AUTH:
      return { ...state, ...action.payload }
    case DEAUTH:
      return initialState
    default:
      return state
  }
}

export default authReducer
