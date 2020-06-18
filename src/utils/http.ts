import axios from 'axios'

export const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

export const setToken = (token: any = false): Promise<void> => {
  return new Promise((resolve) => {
    if (!token) {
      delete http.defaults.headers.common.Authorization
      resolve()
      return
    }
    http.defaults.headers['user_session_token'] = token
    resolve()
  })
}
