import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {BiHome} from 'react-icons/bi'
import {MdWork} from 'react-icons/md'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const onClickLogOut = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <div className="navbar-container">
      <Link to="/" className="Home-link">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="logo"
        />
      </Link>
      <ul className="menus-container">
        <Link to="/" className="Home-link">
          <li className="menu-item">Home</li>
        </Link>
        <Link to="/jobs" className="Jobs-link">
          <li className="menu-item">Jobs</li>
        </Link>
      </ul>
      <ul className="icons-container-sm">
        <Link to="/" className="Home-link">
          <BiHome className="icon-style" />
        </Link>
        <Link to="/jobs" className="Home-link">
          <MdWork className="icon-style" />
        </Link>
        <FiLogOut className="icon-style3" onClick={onClickLogOut} />
      </ul>
      <ul className="logout-container">
        <li>
          <button type="button" className="logout-btn" onClick={onClickLogOut}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}
export default withRouter(Header)
