import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, likeBlog, destroyBlog, user }) => {
  let sortedBlogs = [].concat(blogs).sort((a, b) => {
    return b.likes - a.likes
  })
  sortedBlogs.sort((a, b) => {
    return b.likes - a.likes
  })

  return (
    <div>
      {sortedBlogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={likeBlog}
          handleDestroy={destroyBlog}
          user={user}
        />
      )}
    </div>
  )
}

export default BlogList