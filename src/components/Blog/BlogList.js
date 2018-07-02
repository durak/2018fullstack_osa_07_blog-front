import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Card } from 'semantic-ui-react'

import { blogLike } from '../../reducers/blogReducer'
import { notify } from '../../reducers/notificationReducer'

import BlogListItem from './blogList/BlogListItem'

export const BlogList = ({ blogs, blogLike, notify }) => {

  return (
    <div>
      <h1>Blogs</h1>
      <Card.Group centered itemsPerRow="4" stackable>
        {blogs.map(blog =>
          <BlogListItem
            key={blog.id}
            blog={blog}
            blogLike={blogLike}
            notify={notify}
          />
        )}
      </Card.Group>
    </div>
  )

}

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
  mapStateToProps,
  { blogLike, notify }
)(BlogList)

BlogListItem.propTypes = {
  blogs: PropTypes.arrayOf(PropTypes.object),
  blogLike: PropTypes.func.isRequired,
  notify: PropTypes.func.isRequired
}