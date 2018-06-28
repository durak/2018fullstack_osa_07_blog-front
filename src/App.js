import React from 'react'
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom'
import { connect } from 'react-redux'

import blogService from './services/blogs'

import { notify } from './reducers/notificationReducer'
import { blogsInit } from './reducers/blogReducer'
import { usersInit } from './reducers/userReducer'

import LoginForm from './components/LoginForm'
import UserList from './components/UserList'
import User from './components/User'
import BlogList from './components/BlogList'
import BlogContainer from './components/BlogContainer'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import LogOutButton from './components/LogOutButton'
import Togglable from './components/Togglable'


class App extends React.Component {

  constructor(props) {
    super(props)
    this.newBlogForm = React.createRef()
  }

  componentDidMount() {
    this.props.blogsInit()
    this.props.usersInit()

    if (this.props.user) {
      blogService.setToken(this.props.user.token)
    }

    console.log('ComponentDidMount this.props.user', this.props.user)
    console.log('ComponentDidMount blogService.token', blogService.token)
    console.log('ComponentDidMount localstorage', JSON.parse(window.localStorage.getItem('loggedBlogAppUser')))
  }

  render() {

    if (this.props.user === null) {
      return (
        <div>
          <Notification />
          <LoginForm />
        </div>
      )
    }

    return (
      <div>
        <Notification  />
        <Router>
          <div>

            <div className="header">
              <Link to="/">blogs</Link> &nbsp;
              <Link to="/users">users</Link> &nbsp;
              <p>{this.props.user.name} logged in</p>
              <LogOutButton />
            </div>

            <div className="beaf">
              <Route exact path="/" render={() => <BlogList />} />
              <Route exact path="/users" render={() => <UserList />} />
              <Route exact path="/users/:id" render={({ match }) =>
                <User userId={match.params.id} />}
              />
              <Route exact path="/blogs/:id" render={({ match }) =>
                <BlogContainer blogId={match.params.id} />}
              />
            </div>

            <Togglable buttonLabel="Add new blog" ref={this.newBlogForm}>
              <NewBlogForm togglable={this.newBlogForm} />
            </Togglable>

          </div>
        </Router>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.loggedIn
  }
}

export default connect(
  mapStateToProps,
  { notify, blogsInit, usersInit }
)(App)
