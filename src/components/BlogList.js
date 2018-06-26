import React from 'react'
import { connect } from 'react-redux'

import Blog from './Blog'

const BlogList = ({ blogs, user }) => (

  <div>
    <h1>Blogs</h1>
    {blogs.map(blog =>
      <Blog
        key={blog.id}
        blog={blog}
        user={user}
      />
    )}
  </div>
)


const mapStateToProps = (state) => {
  let sortedBlogs = []
    .concat(state.blogs)
    .sort((a, b) => {
      return b.likes - a.likes
    })

  return {
    blogs: sortedBlogs,
    user: state.loggedIn
  }
}


export default connect(
  mapStateToProps
)(BlogList)