import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Sidebar, Segment } from 'semantic-ui-react'

import NewBlogForm from './newBlogFormContainer/NewBlogForm'
import { blogCreate } from '../../reducers/blogReducer'
import { notify } from '../../reducers/notificationReducer'
import { toggleSidebar } from '../../reducers/sidebarReducer'

class NewBlogFormContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      author: '',
      url: '',
      valid: {
        title: true,
        author: true,
        url: true
      },
      redirectAfterSubmit: null
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.redirectAfterSubmit !== this.state.redirectAfterSubmit) {
      this.setState({ redirectAfterSubmit: null })
    }
  }

  validateInputs = () => {
    const valid = {
      title: this.state.title.length > 0,
      author: this.state.author.length > 0,
      url: this.state.url.length > 0
    }

    this.setState({
      valid
    })

    return valid.title && valid.author && valid.url
  }

  handleChange =  (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    if (!await this.validateInputs()) return

    const newBlog = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url
    }

    const response = await this.props.blogCreate(newBlog)
    this.props.notify(`a new blog ${newBlog.title} by ${newBlog.author} added`, 'message')


    this.setState({
      title: '', author: '', url: '',
      valid: { title: true, author: true, url: true },
      redirectAfterSubmit: response.id
    })

    this.props.toggleSidebar()
  }

  render() {

    if (this.state.redirectAfterSubmit) {
      return(<Redirect push to={`/blogs/${this.state.redirectAfterSubmit}`} />)
    }


    return (
      <Sidebar as={Segment} animation="overlay" direction="bottom" visible={this.props.sidebar.visible}>
        <NewBlogForm
          handleSubmit={this.handleSubmit} handleChange={this.handleChange} handleCancel={this.props.toggleSidebar}
          title={this.state.title} author={this.state.author} url={this.state.url} valid={this.state.valid}
        />
      </Sidebar>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    sidebar: state.sidebar
  }
}

export default connect(
  mapStateToProps,
  { blogCreate, notify, toggleSidebar }
)(NewBlogFormContainer)

NewBlogFormContainer.propTypes = {
  blogCreate: PropTypes.func.isRequired,
  notify: PropTypes.func.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  sidebar: PropTypes.object.isRequired
}