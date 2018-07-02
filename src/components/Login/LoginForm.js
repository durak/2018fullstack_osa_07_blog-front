import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form, Button } from 'semantic-ui-react'

import { login } from '../../reducers/loginReducer'

class LoginForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    this.props.login(this.state.username, this.state.password)
    this.setState({
      title: '', author: '', url: ''
    })

  }

  render() {

    return (
      <div >
        <h2> Kirjaudu sisään </h2>
        <Form onSubmit={this.handleSubmit}>

          <Form.Field>
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </Form.Field>

          <Form.Field>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Button type="submit">kirjaudu</Button>
        </Form>
      </div >
    )
  }
}

export default connect(
  null,
  { login }
)(LoginForm)

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
}