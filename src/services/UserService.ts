import { http } from '../utils/http'
import { IUser } from '../interfaces/user'
import permissionsData from '../data/permissions'

class UserService {
  /**
   * Filter out user permissions, map to retain only permisison ID
   */
  _setPermissions = (userRole: string): string[] => {
    const permissions = permissionsData
      .filter((permission: any) => {
        return permission.role.includes(userRole)
      })
      .map((permission: any) => permission.id)

    return permissions
  }

  doLogin = (credentials: {
    email: string
    hash: string
    remember: string
  }): Promise<IUser> => {
    const formData = new FormData()
    formData.append('email', credentials.email)
    formData.append('hash', credentials.hash)
    formData.append('remember', credentials.remember)

    return new Promise((resolve, reject) => {
      try {
        http.post('administrator/login_delegate', formData).then(({ data }) => {
          if (data.code === 200) {
            const { token } = data.data
            localStorage.setItem('token', JSON.stringify(token))
            const user = data.data.profile
            const role = data.data.role
            resolve({ ...user, role, permissions: [], token })
          } else {
            reject(data)
          }
        })
      } catch (error) {
        console.log(error)
        reject({ message: 'An unexpected error has occured!' })
        throw error
      }
    })
  }

  /**
   * Revoke user auth token and logout
   */
  doLogout = (): Promise<IUser> => {
    return new Promise((resolve) => {
      http.get(`auth/revoke`).finally(() => {
        resolve()
      })
    })
  }

  /**
   * Fetch user (with token) and assign user permissions
   */
  fetchUser = (token: string): Promise<IUser> => {
    return new Promise((resolve, reject) => {
      try {
        http
          .get(`administrator/read_delegate?token=${token}`)
          .then(async ({ data }) => {
            if (data.code === 200) {
              const user = data.data.profile
              const role = data.data.role

              resolve({ ...user, role, permissions: [] })
            } else {
              reject()
            }
          })
      } catch (error) {
        reject()
        throw error
      }
    })
  }
}

export default UserService
