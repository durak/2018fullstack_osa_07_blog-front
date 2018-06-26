import React from 'react'
import { connect } from 'react-redux'

const User = (props) => {
  if (props.users.length === 0)  {
    return null
  }

  const user = props.users.find((u) => u.id === props.userId)

  return (
    <div>
      <h1>{user.name}</h1>
      <h2>Added blogs</h2>
      <ul>
        {user.blogs.map((blog) =>
          <li key={blog._id}>{`${blog.title} by ${blog.author}`}</li> )
        }
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