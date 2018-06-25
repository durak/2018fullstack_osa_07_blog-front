import React from 'react'
import { connect } from 'react-redux'

import Blog from './Blog'

const BlogList = ({ blogs, user }) => (

  <div>
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
    blogs: sortedBlogs
  }
}


export default connect(
  mapStateToProps
)(BlogList)