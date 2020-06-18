import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import Nav from 'react-bootstrap/Nav'

import { IoIosSpeedometer, IoIosAnalytics, IoMdBriefcase, IoIosCloseCircle } from 'react-icons/io'

import { setGlobal } from '../../store/actions/globalActions'
import { routes } from '../../utils/routes'

interface IProps {
  sidebarOpen: boolean,
  isAuthenticated: boolean,
  setGlobal: (arg1: object) => void
}

const Sidebar: React.FunctionComponent<IProps> = ({ isAuthenticated, sidebarOpen, ...props }) => {
  return (
    <>
      {isAuthenticated && (
        <aside className={`sidebar pt-5 ${sidebarOpen ? 'open' : ''}`}>

          <div
            style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }}
            onClick={() => {
              props.setGlobal({ sidebarOpen: !sidebarOpen })
            }}>
            <IoIosCloseCircle size={24} />
          </div>

          <Nav className="mr-auto flex-column">
            <Nav.Link as={NavLink} to={routes.dashboard} active={false}>
              <IoIosSpeedometer size={18} />
              <span className="ml-1">Dashboard</span>
            </Nav.Link>
            <Nav.Link as={NavLink} to={routes.analytics} active={false}>
              <IoIosAnalytics size={18} />
              <span className="ml-1">Analytics</span>
            </Nav.Link>
            <Nav.Link as={NavLink} to="/#" eventKey="/#" active={false}>
              <IoMdBriefcase size={18} />
              <span className="ml-1">Organization</span>
            </Nav.Link>
          </Nav>
        </aside>
      )}
    </>
  )
}

Sidebar.propTypes = {
  sidebarOpen: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

Sidebar.defaultProps = {
  sidebarOpen: true,
  isAuthenticated: false
}

export default connect((state: { auth: any, global: any }) => ({
  isAuthenticated: !!state.auth.token,
  sidebarOpen: state.global.sidebarOpen,
}), { setGlobal })(Sidebar)
