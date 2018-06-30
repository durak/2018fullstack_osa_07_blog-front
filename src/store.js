import { createStore, combineReducers, applyMiddleware  } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'


import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import loginReducer from './reducers/loginReducer'
import userReducer from './reducers/userReducer'
import sidebarReducer from './reducers/sidebarReducer'

const reducer = combineReducers({
  loggedIn: loginReducer,
  blogs: blogReducer,
  users: userReducer,
  notification: notificationReducer,
  sidebar: sidebarReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store