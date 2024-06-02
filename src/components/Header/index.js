import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import Cookies from 'js-cookie'
import {FiLogOut} from 'react-icons/fi'
import {IoMail} from 'react-icons/io5'
import {Component} from 'react'
import './index.css'

class Header extends Component {
  logout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    return (
      <div className="header-con">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo"
          />
        </Link>
        <div className="md-con">
          <ul className="list-con-md">
            <Link to="/" className="list-item">
              {' '}
              <li> Home </li>{' '}
            </Link>
            <Link to="/jobs" className="list-item">
              {' '}
              <li> Jobs </li>{' '}
            </Link>
          </ul>
          <button type="button" className="button" onClick={this.logout}>
            {' '}
            Logout{' '}
          </button>
        </div>
        <div className="sm-con">
          <ul className="list-con-sm">
            <Link to="/" className="list-item">
              <li>
                {' '}
                <AiFillHome />{' '}
              </li>
            </Link>
            <Link to="/jobs" className="list-item">
              <li>
                {' '}
                <IoMail />{' '}
              </li>
            </Link>
            <button onClick={this.logout} className="logout-btn" type="button">
              <li>
                {' '}
                <FiLogOut />{' '}
              </li>
            </button>
          </ul>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
