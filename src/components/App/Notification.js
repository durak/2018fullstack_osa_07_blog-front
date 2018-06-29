import React from 'react'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'

const Notification = ({ message, type }) => {

  if (message === null) {
    return null
  }

  if (type === 'message') {
    return (
      <Message success floating> {message} </Message>
    )
  }

  if (type === 'error') {
    return <Message negative> {message} </Message>
  }
  return (
    <Message>{message}</Message>
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