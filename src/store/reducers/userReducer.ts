import React from 'react'
import { SET_USER, UNSET_USER } from '../actions/actionTypes'
import { IUser as IState } from '../../interfaces/user'

interface IAction {
  type: string
  payload: IState
}

const initialState: IState = {}

const userReducer: React.Reducer<IState, IAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, ...action.payload }
    case UNSET_USER:
      return { ...action.payload }
    default:
      return state
  }
}

export default userReducer
