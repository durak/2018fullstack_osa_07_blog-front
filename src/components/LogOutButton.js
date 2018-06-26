import React from 'react'
import { connect } from 'react-redux'

import { logout } from '../reducers/loginReducer'

const LogOutButton = (props) => {

  if (props.user) {
    return (
      <div>
        <button onClick={props.logout}> logout </button>
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