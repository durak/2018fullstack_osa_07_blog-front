import React from 'react'
import { connect } from 'react-redux'

const UserList = ({ users }) => (

  <div>
    <table>
      <tbody>
        <tr>
          <td />
          <td>Blogs</td>
        </tr>

        {users.map(user =>
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.blogs.length}</td>
          </tr>
        )}

      </tbody>
    </table>
  </div>
)


const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(
  mapStateToProps
)(UserList)