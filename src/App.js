import React from 'react'
import { connect } from 'react-redux'


import BlogList from './components/BlogList'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import { notify } from './reducers/notificationReducer'
import { blogsInit } from './reducers/blogReducer'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      user: null
    }
    this.newBlogForm = React.createRef()
  }

  componentDidMount() {
    console.log('mount')

    this.props.blogsInit()

    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  handleFieldChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  login = async (e) => {
    e.preventDefault()
    console.log('login in with', this.state.username, this.state.password)

    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      this.setState({ username: '', password: '', user })
      this.setState({ user })
      blogService.setToken(user.token)
    } catch (exception) {

      console.log(exception)
      this.props.notify('wrong username or password', 'error')
    }
  }

  logout = (e) => {
    e.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')

    const usrname = this.state.user.username

    this.setState({
      user: null
    })

    this.props.notify(`user ${usrname} logged out`, 'message')

  }


  render() {

    if (this.state.user === null) {
      return (
        <div>
          <Notification />
          <LoginForm
            handleSubmit={this.login}
            handleChange={this.handleFieldChange}
            username={this.state.username}
            password={this.state.password}
          />
        </div>
      )
    }

    return (
      <div>
        <Notification  />
        <div>
          <div>
            <p>{this.state.user.name} logged in</p>
            <button onClick={this.logout}> logout </button>
          </div>

          <BlogList  user={this.state.user} />
          <Togglable buttonLabel="Add new blog" ref={this.newBlogForm}>
            <NewBlogForm addBlog={this.addBlog} togglable={this.newBlogForm} />
          </Togglable>
        </div>
      </div>
    )
  }
}

export default connect(
  null,
  { notify, blogsInit }
)(App)
