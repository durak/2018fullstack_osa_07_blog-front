import React from 'react'
import { connect } from 'react-redux'

import blogService from './services/blogs'

import { notify } from './reducers/notificationReducer'
import { blogsInit } from './reducers/blogReducer'

import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
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
    console.log('mount', this.props.user)

    this.props.blogsInit()
    if (this.props.user) {
      blogService.setToken(this.props.user.token)
    }

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
        <div>
          <p>{this.props.user.name} logged in</p>
          <LogOutButton />
          <BlogList />
          <Togglable buttonLabel="Add new blog" ref={this.newBlogForm}>
            <NewBlogForm togglable={this.newBlogForm} />
          </Togglable>
        </div>
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
  { notify, blogsInit }
)(App)
