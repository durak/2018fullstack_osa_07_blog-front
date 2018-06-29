import React from 'react'
import { connect } from 'react-redux'

import { blogLike, blogDestroy, blogAddComment } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'

import Blog from './Blog'
import BlogComments from './BlogComments'
import BlogCommentForm from './BlogCommentForm'

const BlogContainer = ({
  user,
  blogId,
  blogs,
  blogLike,
  blogDestroy,
  blogAddComment,
  notify
}) => {

  console.log('blogs in BlogContainer', blogs)
  console.log('blogId in BlogContainer', blogId)
  console.log('user in BlogContainer', user)

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