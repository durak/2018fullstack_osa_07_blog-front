import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'

import { logout } from '../../reducers/loginReducer'

const LogOutButton = (props) => {

  if (props.user) {
    return (
      <Button negative onClick={() => props.logout(props.user)}> logout </Button>
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

LogOutButton.propTypes = {
  user: PropTypes.object.isRequired
}