import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const UserList = ({ users }) => {
  console.log('UserList', users)

  return(
    <div>
      <h1>Users</h1>
      <table>
        <tbody>
          <tr>
            <td />
            <td>Blogs</td>
          </tr>

          {users.map(user =>
            <tr key={user.id}>
              <td><Link to={`users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          )}

        </tbody>
      </table>
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
)(UserList)