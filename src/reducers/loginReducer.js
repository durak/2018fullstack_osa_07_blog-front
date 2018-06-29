import loginService from '../services/login'
import blogService from '../services/blogs'
import { notify } from './notificationReducer'

console.log('initial localstorage login')
const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
const initialState = loggedUserJSON ? JSON.parse(loggedUserJSON) : null

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'LOGIN':
    return action.user
  case 'LOGOUT':
    return null
  default:
    return state
  }
}


//------------ACTION CREATORS------------


export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)

      dispatch({
        type: 'LOGIN',
        user
      })

    } catch (exception) {

      console.log(exception)
      dispatch(notify('wrong username or password', 'error'))
    }
  }
}

export const logout = (user) => {
  return (dispatch) => {    
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch({
      type: 'LOGOUT'
    })
    blogService.setToken(null)
    dispatch(notify(`user ${user.name} logged out`, 'message'))
  }
}

export default loginReducer