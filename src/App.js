import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Container, Menu, Loader, Image, Dropdown } from 'semantic-ui-react'
import logo from './marx.jpg'

import blogService from './services/blogs'

import { notify } from './reducers/notificationReducer'
import { blogsInit } from './reducers/blogReducer'
import { usersInit } from './reducers/userReducer'
import { toggleSidebar } from './reducers/sidebarReducer'
import { logout } from './reducers/loginReducer'

import LoginForm from './components/Login/LoginForm'
import UserList from './components/User/UserList'
import User from './components/User/User'
import BlogList from './components/Blog/BlogList'
import BlogContainer from './components/Blog/BlogContainer'
import NewBlogFormContainer from './components/Blog/NewBlogFormContainer'
import Notification from './components/App/Notification'
import ScrollToTop from './components/App/ScrollToTop'


class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  async initUsersAndBlogs() {
    blogService.setToken(this.props.user.token)
    await this.props.blogsInit()
    await this.props.usersInit()
    await this.setState({ loading:false })
  }

  async componentDidMount() {
    // User was found in localStorage
    if (this.props.user) {
      // console.log('----USER FROM LOCAL STORAGE---')
      this.initUsersAndBlogs()
    }
  }

  async componentDidUpdate(prevProps) {
    // User was not in localStorage and logged in
    if (prevProps.user !== this.props.user && this.props.user) {
      // console.log('----USER LOGGED IN---')
      this.initUsersAndBlogs()
    }
  }

  render() {


    if (this.props.user === null) {
      return (
        <Container>
          <Notification />
          <LoginForm />
        </Container>
      )
    }

    if (this.state.loading) {
      return (
        <Container>
          <Loader active size="massive" />
        </Container>
      )
    }

    return (
      <div>

        <Router>
          <ScrollToTop>
            <Container>

              <Menu inverted fixed="top" fitted="vertical">
                <Container fluid>
                  <Menu.Item header>
                    <span>
                      <Image size="mini" src={logo} style={{ marginRight: '1.5em' }} />
                    BlogMarx
                    </span>
                  </Menu.Item>

                  <Dropdown item text={this.props.user.name}>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={this.props.toggleSidebar}>Add blog</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={() => this.props.logout(this.props.user)}>Log out</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                  <Menu.Item link as={Link} to="/">Blogs</Menu.Item>
                  <Menu.Item link as={Link} to="/users">Users</Menu.Item>

                </Container>
              </Menu>


              <Container  fluid style={{ marginTop: '7em' }}>
                <Notification  />

                <Route exact path="/" render={() => <BlogList />} />
                <Route exact path="/users" render={() => <UserList />} />
                <Route exact path="/users/:id" render={({ match }) =>
                  <User userId={match.params.id} />}
                />
                <Route exact path="/blogs/:id" render={({ match }) =>
                  <BlogContainer blogId={match.params.id} />}
                />
              </Container>

              <NewBlogFormContainer />

            </Container>
          </ScrollToTop>
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
  { notify, blogsInit, usersInit, toggleSidebar, logout }
)(App)

App.propTypes = {
  user: PropTypes.object,
  notify: PropTypes.func.isRequired,
  blogsInit: PropTypes.func.isRequired,
  usersInit: PropTypes.func.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
}
