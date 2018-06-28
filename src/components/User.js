import React from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

const User = (props) => {
  const user = props.users.find((u) => u.id === props.userId)

  if (user === undefined) return <Redirect to="/" />

  return (
    <div>
      <h1>{user.name}</h1>
      <h2>Added blogs</h2>
      <ul>

        {user.blogs.map((blog) =>
          <li key={blog._id}>
            <Link to={`../blogs/${blog._id}`} >{`${blog.title} by ${blog.author}`} </Link>
          </li>
        )}

      </ul>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(
  mapStateToProps
)(User)