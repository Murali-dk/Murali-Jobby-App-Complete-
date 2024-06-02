import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showError: false, errMsg: ''}

  onSuccess = data => {
    const {history} = this.props
    Cookies.set('jwt_token', data.jwt_token, {expires: 30})
    history.replace('/')
  }

  onFailure = data => {
    this.setState({showError: true, errMsg: data.error_msg})
  }

  formSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const details = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(details),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccess(data)
    } else {
      this.onFailure(data)
    }
  }

  usernameChange = event => {
    this.setState({username: event.target.value})
  }

  passwordChange = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {showError, errMsg} = this.state
    if (Cookies.get('jwt_token') !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="form-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo"
          />
          <form onSubmit={this.formSubmit}>
            <div className="input-con">
              <label htmlFor="username" className="label-el">
                {' '}
                USERNAME{' '}
              </label>
              <input
                type="text"
                id="username"
                className="input-el"
                placeholder="Username"
                onChange={this.usernameChange}
              />
            </div>
            <div className="input-con">
              <label htmlFor="password" className="label-el">
                {' '}
                PASSWORD{' '}
              </label>
              <input
                type="password"
                id="password"
                className="input-el"
                placeholder="Password"
                onChange={this.passwordChange}
              />
            </div>
            <div className="input-con">
              <button type="submit" className="button">
                {' '}
                Login{' '}
              </button>
              {showError && <p className="err-msg"> *{errMsg} </p>}
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
