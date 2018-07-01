import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'


const UserList = ({ users }) => {

  return(
    <div>
      <h1>Users</h1>
      <Table unstackable>
        <Table.Body>
          <Table.Row>
            <Table.Cell />
            <Table.Cell>Blogs</Table.Cell>
          </Table.Row>

          {users.map(user =>
            <Table.Row key={user.id}>
              <Table.Cell><Link to={`users/${user.id}`}>{user.name}</Link></Table.Cell>
              <Table.Cell>{user.blogs.length}</Table.Cell>
            </Table.Row>
          )}

        </Table.Body>
      </Table>
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