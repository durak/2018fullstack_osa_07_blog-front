import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { blogCreate } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'

class NewBlogForm extends React.Component {
  static propTypes = {
    blogCreate: PropTypes.func.isRequired,
    notify: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      visible: false,
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
    this.props.togglable.current.toggleVisibility()
    console.log('RESPOEEEEENNENSNSNNENE', response)

    this.setState({
      title: '', author: '', url: '',
      valid: { title: true, author: true, url: true },
      redirectAfterSubmit: response.id
    })
  }


  render() {

    if (this.state.redirectAfterSubmit) {
      return(<Redirect push to={`/blogs/${this.state.redirectAfterSubmit}`} />)
    }


    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            title
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
            <label>{this.state.valid.title ? '' : 'required'}</label>
          </div>
          <div>
            author
            <input
              type="text"
              name="author"
              value={this.state.author}
              onChange={this.handleChange}
            />
            <label>{this.state.valid.author ? '' : 'required'}</label>
          </div>
          <div>
            url
            <input
              type="text"
              name="url"
              value={this.state.url}
              onChange={this.handleChange}
            />
            <label>{this.state.valid.url ? '' : 'required'}</label>
          </div>
          <button type="submit">lisää</button>
        </form>
      </div>
    )
  }
}

export default connect(
  null,
  { blogCreate, notify }
)(NewBlogForm)