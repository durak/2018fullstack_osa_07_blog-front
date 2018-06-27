import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { blogLike, blogDestroy } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'

class Blog extends React.Component {
  static propTypes = {
    handleDestroy: PropTypes.func.isRequired,
    handleLike: PropTypes.func.isRequired,
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      fullView: false
    }
  }

  toggleVisibility = () => {
    this.setState({ fullView: !this.state.fullView })
  }


  render() {
    const blog = this.props.blog ? this.props.blog : this.props.blogs.find((b) => b.id === this.props.blogId)

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    const hideWhenVisible = { display: this.state.fullView ? 'none' : '' }
    const showWhenVisible = { display: this.state.fullView ? '' : 'none' }

    const destroyButtonVisible =
      { display: blog.user && (blog.user.username !== this.props.user.username) ? 'none' : '' }


    return (
      <div style={blogStyle} >
        <div style={hideWhenVisible} className="minimized">
          <p className="clickable" onClick={this.toggleVisibility}>{blog.title} {blog.author}</p>
        </div>
        <div style={showWhenVisible} className="maximized">
          <p className="clickable" onClick={this.toggleVisibility}>{blog.title} {blog.author}</p>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          <a href={blog.url}>{blog.url}</a>
          <p>
            likes: {blog.likes}
            <button onClick={this.props.handleLike(blog)}>like</button>
          </p>
          <p className="addedBy">added by {blog.user ? blog.user.name : 'anonymous'}</p>
          <div className="destroy" style={destroyButtonVisible}>
            <p><button onClick={this.props.handleDestroy(blog)}>delete</button></p>
          </div>
          <div className="comments">
            <h2>Comments</h2>
            <ul>
              {blog.comments.map((comment) =>
                <li key={comment._id}>{comment.comment}</li>)}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}


const dispatchLike = (dispatch, blog) => {
  const msg = `you liked ${blog.title} by ${blog.author}`
  dispatch(blogLike(blog))
  dispatch(notify(msg, 'message'))
}

const dispatchDestroy = (dispatch, blog) => {
  if (window.confirm(`delete ${blog.title} by ${blog.author}?`)) {
    dispatch(blogDestroy(blog))
    dispatch(notify(`Blog ${blog.title} by ${blog.author} deleted`, 'message'))
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleLike: (blog) => () => dispatchLike(dispatch, blog),
    handleDestroy: (blog) => () => dispatchDestroy(dispatch, blog)
  }
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.loggedIn
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)