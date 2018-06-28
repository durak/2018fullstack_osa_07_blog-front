import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = ({ blogs }) => (

  <div>
    <h1>Blogs</h1>
    <table>
      <tbody>
        {blogs.map(blog =>

          <tr key={blog.id}>
            <td>
              <Link to={`blogs/${blog.id}`} > {blog.title} </Link>
            </td>
          </tr>

        )}
      </tbody>
    </table>
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