import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'

const BlogList = ({ blogs }) => {
  console.log('blogs in bloglist', blogs)
  return (
    <div>
      <h1>Blogs</h1>
      <Table striped celled>
        <Table.Body>
          {blogs.map(blog =>

            <Table.Row key={blog.id}>
              <Table.Cell>
                <Link to={`blogs/${blog.id}`} > {blog.title} </Link>
              </Table.Cell>
            </Table.Row>

          )}
        </Table.Body>
      </Table>
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