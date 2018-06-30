import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, Card, Icon } from 'semantic-ui-react'

import BlogListItem from './blogList/BlogListItem'

const BlogList= ({ blogs }) => {
  console.log('blogs in bloglist', blogs)

  return (
    <Card.Group centered>

      {blogs.map(blog =>
        <BlogListItem key={blog.id} blog={blog} />
      )}
    </Card.Group>
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