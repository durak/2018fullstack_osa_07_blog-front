import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Container, Menu, Loader, Segment, Button, Icon, Image } from 'semantic-ui-react'
import logo from './marx.jpg'

import blogService from './services/blogs'

import { notify } from './reducers/notificationReducer'
import { blogsInit } from './reducers/blogReducer'
import { usersInit } from './reducers/userReducer'
import { toggleSidebar } from './reducers/sidebarReducer'

import LoginForm from './components/Login/LoginForm'
import UserList from './components/User/UserList'
import User from './components/User/User'
import BlogList from './components/Blog/BlogList'
import BlogContainer from './components/Blog/BlogContainer'
import NewBlogForm from './components/Blog/NewBlogForm'
import NewBlogFormContainer from './components/Blog/NewBlogFormContainer'
import Notification from './components/App/Notification'
import LogOutButton from './components/Login/LogOutButton'
import Togglable from './components/App/Togglable'


class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      sideBar: false
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
      <div >
        <Router>
          <Container>

            <Menu inverted fixed="top" fitted="vertical">
              <Container>
                <Menu.Item header>
                  <span>
                    <Image size="mini" src={logo} style={{ marginRight: '1.5em' }} />
                  BlogMarx
                  </span>
                </Menu.Item>
                <Menu.Item>
                  <p>{this.props.user.name} logged in</p>
                </Menu.Item>
                <Menu.Item link>
                  <Link to="/">blogs</Link>
                </Menu.Item>
                <Menu.Item link>
                  <Link to="/users">users</Link> &nbsp;
                </Menu.Item>
                <Menu.Item>
                  <Button primary onClick={this.props.toggleSidebar}>add blog</Button>
                </Menu.Item>
                <Menu.Item>
                  <LogOutButton />
                </Menu.Item>
              </Container>
            </Menu>

            <Container  fluid  style={{ marginTop: '7em' }}>

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
  { notify, blogsInit, usersInit, toggleSidebar }
)(App)



{/* <Segment vertical style={{ margin: '5em 0em 0em', padding: '5em 0em' }}>
<Container >
  <Togglable buttonLabel="Add new blog" ref={this.newBlogForm}>
    <NewBlogForm togglable={this.newBlogForm} />
  </Togglable>
</Container>
</Segment> */}