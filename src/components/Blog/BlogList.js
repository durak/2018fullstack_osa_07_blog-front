import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Card } from 'semantic-ui-react'

import BlogListItem from './blogList/BlogListItem'

const BlogList = ({ blogs }) => {

  return (
    <div>
      <h1>Blogs</h1>
      <Card.Group centered itemsPerRow="4" stackable>
        {blogs.map(blog =>
          <BlogListItem key={blog.id} blog={blog} />
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
  mapStateToProps
)(BlogList)

BlogListItem.propTypes = {
  blogs: PropTypes.arrayOf(PropTypes.object)
}