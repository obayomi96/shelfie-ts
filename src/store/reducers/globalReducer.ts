import React from 'react'
import { SET_GLOBAL } from '../actions/actionTypes'

interface IState {
  theme: string
  isLoading: boolean
  sidebarOpen: boolean
}

interface IAction {
  type: string
  payload: IState
}

const initialState: IState = {
  theme: 'light',
  isLoading: false,
  sidebarOpen: true,
}

const globalReducer: React.Reducer<IState, IAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SET_GLOBAL:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export default globalReducer
