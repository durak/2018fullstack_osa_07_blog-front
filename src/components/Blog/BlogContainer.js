import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { blogLike, blogDestroy, blogAddComment } from '../../reducers/blogReducer'
import { notify } from '../../reducers/notificationReducer'

import Blog from './blogContainer/Blog'
import BlogComments from './blogContainer/BlogComments'
import BlogCommentForm from './blogContainer/BlogCommentForm'

export const BlogContainer = ({
  user,
  blogId,
  blogs,
  blogLike,
  blogDestroy,
  blogAddComment,
  notify }) => {

  const blog = blogs.find((b) => b.id === blogId)

  const handleDestroy = () => {
    if (window.confirm(`delete ${blog.title} by ${blog.author}?`)) {
      blogDestroy(blog)
      notify(`Blog ${blog.title} by ${blog.author} deleted`, 'message')
    }
  }

  const handleLike = () => {
    const msg = `you liked ${blog.title} by ${blog.author}`
    blogLike(blog)
    notify(msg, 'message')
  }

  const handleComment = (comment) => {
    const msg = `comment '${comment}' added to blog '${blog.title}'`
    blogAddComment(blog, comment)
    notify(msg, 'message')
  }


  return (
    <div>
      <Blog
        blog={blog}
        user={user}
        handleLike={handleLike}
        handleDestroy={handleDestroy}
      />
      <BlogComments blog={blog} />
      <BlogCommentForm handleComment={handleComment} />
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.loggedIn
  }
}

export default connect(
  mapStateToProps,
  { blogLike, blogDestroy, blogAddComment, notify }
)(BlogContainer)

BlogContainer.propTypes = {
  user: PropTypes.object.isRequired,
  blogId: PropTypes.string.isRequired,
  blogs: PropTypes.arrayOf(PropTypes.object).isRequired,
  blogLike: PropTypes.func.isRequired,
  blogAddComment: PropTypes.func.isRequired,
  notify: PropTypes.func.isRequired
}