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
    this.state = {
      loading: true
    }
    this.newBlogForm = React.createRef()
  }

  async initUsersAndBlogs() {
    blogService.setToken(this.props.user.token)
    await this.props.blogsInit()
    await this.props.usersInit()
    await this.setState({ loading:false })
  }

  async componentDidMount() {

    console.log('ComponentDidMount LOADDIIIING', this.state.loading)
    if (this.props.user) {
      this.initUsersAndBlogs()
/*       console.log('APP SETS TOKEN')
      blogService.setToken(this.props.user.token)
      await this.props.blogsInit()
      await this.props.usersInit()
      await this.setState({ loading:false }) */
    } else {
      console.log('APP DOES NOT SET TOKEN')
    }



    console.log('ComponentDidMount LOADDIIIING AFFTERR', this.state.loading)
  }

  async componentDidUpdate(prevProps, prevState) {
/*     console.log('COMPONENTDIDUPDATE prevProps', prevProps)
    console.log('COMPONENTDIDUPDATE new props', this.props)
    console.log('COMPONENTDIDUPDATE prevState', prevState)
    console.log('COMPONENTDIDUPDATE new State', this.state) */
    if (prevProps !== this.props && this.props.user) {
      console.log('----PROPS DONT MATCH---')
      this.initUsersAndBlogs()
/*       blogService.setToken(this.props.user.token)
      await this.props.blogsInit()
      await this.props.usersInit()
      await this.setState({ loading:false }) */
    }
  }

  render() {
    console.log('APP render')
    console.log('APP user prop', this.props.user)

    if (this.props.user === null) {
      return (
        <div>
          <Notification />
          <LoginForm />
        </div>
      )
    }

    if (this.state.loading) return <em>Loading...</em>

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
