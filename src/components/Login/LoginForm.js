import React from 'react'
import { connect } from 'react-redux'

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
        <form onSubmit={this.handleSubmit}>
          <div>
          Käyttäjänimi
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </div>

          <div>
          Salasana
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <button>kirjaudu</button>
        </form>
      </div >
    )
  }
}

export default connect(
  null,
  { login }
)(LoginForm)