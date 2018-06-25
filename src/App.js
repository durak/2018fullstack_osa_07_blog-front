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
      blogs: [],
      username: '',
      password: '',
      user: null,
      error: null
    }
    this.newBlogForm = React.createRef()
  }

  componentDidMount() {
    console.log('mount')
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

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


  addBlog = async (newBlog) => {

    try {
      this.newBlogForm.current.toggleVisibility()
      const savedBlog = await blogService.create(newBlog)

      const msg = `a new blog ${savedBlog.title} by ${savedBlog.author} added`

      this.setState({
        blogs: this.state.blogs.concat(savedBlog)
      })

      this.props.notify(msg,  'message' )

    } catch (exception) {

      console.log(exception)
    }
  }


  render() {

    const logoutForm = () => (
      <div>
        <p>{this.state.user.name} logged in</p>
        <button onClick={this.logout}> logout </button>
      </div>
    )


    return (
      <div>

        <Notification  />

        {this.state.user === null ?
          <LoginForm
            handleSubmit={this.login}
            handleChange={this.handleFieldChange}
            username={this.state.username}
            password={this.state.password}
          />

          :

          <div>
            {logoutForm()}

            <BlogList  user={this.state.user} />
            <Togglable buttonLabel="Add new blog" ref={this.newBlogForm}>
              <NewBlogForm addBlog={this.addBlog} />
            </Togglable>
          </div>
        }



      </div>
    )
  }
}

export default connect(
  null,
  { notify, blogsInit }
)(App)
