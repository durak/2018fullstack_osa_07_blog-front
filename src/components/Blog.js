import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import { blogLike, blogDestroy, blogToggleVisibility } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'

const Blog = (props) => {
  let blog = { ...props.blog }

  const toggleVisibility = () => {
    props.blogToggleVisibility(props.blog)
  }

  const like = () => {
    let blog = { ...props.blog }
    props.blogLike(blog)
    props.notify(`You liked ${blog.title} by ${blog.author}`, 'message')
  }

  const destroy = ()  => {
    let blog = props.blog
    if (window.confirm(`delete ${blog.title} by ${blog.author}?`)) {
      props.blogDestroy(blog)
      props.notify(`Blog ${blog.title} by ${blog.author} deleted`, 'message')
    }
  }


  const blog = props.blog

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideWhenVisible = { display: props.blog.fullView ? 'none' : '' }
  const showWhenVisible = { display: props.blog.fullView ? '' : 'none' }

  const destroyVisible =
      { display: blog.user && (blog.user.username !== props.user.username) ? 'none' : '' }


  return (
    <div style={blogStyle} >
      <div style={hideWhenVisible} className="minimized">
        <p className="clickable" onClick={toggleVisibility}>{blog.title} {blog.author}</p>
      </div>
      <div style={showWhenVisible} className="maximized">
        <p className="clickable" onClick={toggleVisibility}>{blog.title} {blog.author}</p>
        <a href={blog.url}>{blog.url}</a>
        <p>
            likes: {blog.likes}
          <button onClick={like}>like</button>
        </p>
        <p className="addedBy">added by {blog.user ? blog.user.name : 'anonymous'}</p>
        <div className="destroy" style={destroyVisible}>
          <p><button onClick={destroy}>delete</button></p>
        </div>
      </div>
    </div>
  )
}



const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleLike: (blog) => () => {
      const msg = `you liked ${blog.title} by ${blog.author}`
      dispatch(blogLike(blog))
      dispatch(notify(msg, 'message'))
    }
  }
}

export default connect(
  null,
  { blogLike, blogDestroy, blogToggleVisibility, notify }
)(Blog)


/*   static propTypes = {
    blogDestroy: PropTypes.func.isRequired,
    blogLike: PropTypes.func.isRequired,
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  } */