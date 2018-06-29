import React from 'react'
import { connect } from 'react-redux'

const Notification = ({ message, type }) => {

  if (message === null) {
    return null
  }
  return (
    <div className={type}>
      {message}
    </div>
  )
}

const mapStateToProps = (state) => {

  if (state.notification === null) return { message: null }
  return {
    message: state.notification.message,
    type: state.notification.notificationType
  }
}

export default connect(
  mapStateToProps
)(Notification)