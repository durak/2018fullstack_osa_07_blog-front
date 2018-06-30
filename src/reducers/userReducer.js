import userService from '../services/users'

const userReducer = (state = [], action) => {
  switch (action.type) {
  case 'USERS_INIT': {    
    return action.users
  }
  case 'USERS_SINGLE_UPDATE': {    
    return state.map((u) => u.id !== action.updatedUser.id ? u : action.updatedUser)
  }
  case 'USERS_CLEAR_ALL':
    return []

  default:
    return state
  }
}

//------------ACTION CREATORS------------

export const usersInit = () => {
  return async (dispatch) => {
    try {
      const users = await userService.getAll()
      dispatch({ type: 'USERS_INIT', users })
    } catch (exception) {
      console.log(exception)
    }
  }
}

export const userUpdate = (user) => {
  return async (dispatch) => {
    try {
      const updatedUser = await userService.getOne(user._id)
      dispatch({ type: 'USERS_SINGLE_UPDATE', updatedUser })
    } catch (exception) {
      console.log(exception)
    }
  }
}

export const usersClearAll = () => {
  return async (dispatch) => {
    dispatch({ type:'USERS_CLEAR_ALL' })
  }
}

export default userReducer