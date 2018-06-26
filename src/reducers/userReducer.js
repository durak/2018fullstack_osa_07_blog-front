import userService from '../services/users'

const userReducer = (state = [], action) => {
  switch (action.type) {
  case 'USERS_INIT': {
    console.log('userReducer USERS.INIT is done with data:', action.users)
    return action.users
  }
  case 'USERS_SINGLE_UPDATE': {
    console.log('userReducer state before update is', state)
    return state.map((u) => u.id !== action.updatedUser.id ? u : action.updatedUser)
  }
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
  console.log('userReducer receives user from blogReducer', user)
  return async (dispatch) => {
    try {
      console.log('userReducer inside async teh user is', user)
      const updatedUser = await userService.getOne(user._id)
      console.log('userReducer does ACTION with user', updatedUser)
      dispatch({ type: 'USERS_SINGLE_UPDATE', updatedUser })
    } catch (exception) {
      console.log(exception)
    }
  }
}

export default userReducer