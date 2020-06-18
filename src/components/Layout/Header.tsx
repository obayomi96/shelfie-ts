import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Nav, NavDropdown, Navbar, Image } from 'react-bootstrap'
import {
  IoIosNotifications,
  IoIosSearch,
  IoIosArrowDropleftCircle,
} from 'react-icons/io'

import { doLogout } from '../../store/actions/authActions'
import { setGlobal } from '../../store/actions/globalActions'

import Avatar from '../../assets/svg/avatar.svg'

interface IProps {
  title: string
  hasBack?: boolean
  sidebarOpen?: boolean
  onClickBack?: () => void
  doLogout: () => void
  setGlobal: (arg1: { sidebarOpen: boolean }) => void
}

const Header: React.FunctionComponent<IProps> = ({
  title,
  hasBack,
  sidebarOpen,
  ...props
}) => {
  const toggleSidebar = (): void => {
    props.setGlobal({ sidebarOpen: !sidebarOpen })
  }

  return (
    <header>
      <Navbar bg="white" expand="lg">
        <div className="d-flex align-items-center">
          {hasBack && (
            <span onClick={props.onClickBack} className="pr-2">
              <IoIosArrowDropleftCircle size={24} />
            </span>
          )}

          <Navbar.Brand href="#home">{title}</Navbar.Brand>

          <small
            onClick={toggleSidebar}
            className="text-muted text-uppercase ml-3"
            style={{ cursor: 'pointer' }}
          >
            <b>Toggle Sidebar</b>
          </small>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto d-flex align-items-center justify-content-end">
            <Nav.Link href="#" className="d-none d-lg-block">
              <IoIosSearch size={24} />
            </Nav.Link>
            <Nav.Link href="#" className="d-none d-md-block">
              <IoIosNotifications className="ml-3" size={24} />
            </Nav.Link>
            <NavDropdown
              id="profile-dropdown"
              title={<Image className="ml-3" src={Avatar} roundedCircle />}
              menuRole="menu"
            >
              <NavDropdown.Item href="#" onClick={props.doLogout}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  hasBack: PropTypes.bool,
  sidebarOpen: PropTypes.bool,
  onClickBack: PropTypes.func,
  doLogout: PropTypes.func.isRequired,
  setGlobal: PropTypes.func.isRequired,
}

Header.defaultProps = {
  hasBack: false,
  sidebarOpen: true,
}

export default connect(
  (state: { global: any }) => ({
    sidebarOpen: state.global.sidebarOpen,
  }),
  { doLogout, setGlobal }
)(Header)
