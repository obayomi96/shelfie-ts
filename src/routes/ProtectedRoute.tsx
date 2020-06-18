import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

interface IProps {
	isAuthenticated: boolean
	component: any,
	exact: any,
	path: any
}

const ProtectedRoute: React.FunctionComponent<IProps> = ({
	isAuthenticated,
	component,
	...rest
}) => {
	const Component = component
	return (
		<Route
			{...rest}
			render={(props) =>
				isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
			}
		/>
	)
}

ProtectedRoute.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
	component: PropTypes.any
}

ProtectedRoute.defaultProps = {
	isAuthenticated: false,
}

export default connect((state: { auth: any }) => ({
	isAuthenticated: !!state.auth.token,
}))(ProtectedRoute)
