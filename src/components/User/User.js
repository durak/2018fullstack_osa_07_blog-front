import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { List } from 'semantic-ui-react'

const User = (props) => {
  const user = props.users.find((u) => u.id === props.userId)
  if (user === undefined) return <Redirect to="/" />

  return (
    <div>
      <h1>{user.name}</h1>
      <h2>Added blogs</h2>

      <List bulleted>
        {user.blogs.map((blog) =>
          <List.Item key={blog._id}>
            <Link to={`../blogs/${blog._id}`} >{`${blog.title} by ${blog.author}`} </Link>
          </List.Item>
        )}
      </List>
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

User.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  userId: PropTypes.string.isRequired
}