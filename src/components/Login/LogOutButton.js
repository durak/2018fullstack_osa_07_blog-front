import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'

import { logout } from '../../reducers/loginReducer'

const LogOutButton = (props) => {

  if (props.user) {
    return (
      <div>
        <Button onClick={() => props.logout(props.user)}> logout </Button>
      </div>
    )
  }

  return null
}

const mapStateToProps = (state) => {
  return {
    user: state.loggedIn
  }
}

export default connect(
  mapStateToProps,
  { logout }
)(LogOutButton)