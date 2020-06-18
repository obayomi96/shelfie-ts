import * as React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { Redirect } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Container, Row, Col } from 'react-bootstrap'
import { Card, Form, Button, Spinner } from 'react-bootstrap'
import { connect } from 'react-redux'
import { useToasts } from 'react-toast-notifications'

import UserService from '../../services/UserService'

import { routes } from '../../utils/routes'
import { AUTH, SET_USER } from '../../store/actions/actionTypes'
import { IUser } from '../../interfaces/user'

import Logo from '../../assets/svg/suplias-logo.svg'

interface IProps {
  isAuthenticated: boolean
  dispatch: ({ type: string, payload: any }) => void
}

const Login: React.FunctionComponent<IProps> = ({
  isAuthenticated,
  ...props
}) => {
  const userService = new UserService()

  const { addToast } = useToasts()

  const formConfig = {
    initialValues: {
      email: 'staff@beiersdorf.com',
      hash: 'password',
      remember: true,
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Email field is required.'),
      hash: Yup.string().required('Enter your password'),
    }),
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true)

      const formData = new FormData()
      formData.append('email', values.email)
      formData.append('hash', values.hash)
      formData.append('remember', values.remember)

      userService
        .doLogin(values)
        .then((user: IUser) => {
          setSubmitting(false)
          props.dispatch({ type: SET_USER, payload: user })
          props.dispatch({ type: AUTH, payload: { token: user.token } })
        })
        .catch((error) => {
          setSubmitting(false)
          addToast(error.message, { appearance: 'error' })
        })
    },
  }

  if (isAuthenticated) {
    return <Redirect to={routes.dashboard} />
  }

  return (
    <Container style={{ paddingTop: '120px' }}>
      <Row className="d-flex align-items-center">
        <Col>
          <img alt="Suplias Logo" src={Logo} />
          <h1 className="mt-4">
            Grow your <span className="text-primary">business.</span>
          </h1>
          <p style={{ fontSize: '20px' }}>
            Suplias retail and logistics network enables FMCG companies sell
            directly to 10x more stores.
          </p>
        </Col>
        <Col>
          <Card style={{ padding: '30px' }}>
            <Card.Body>
              <h4>Welcome back</h4>
              <h4 className="text-muted mb-4">Log in to continue</h4>

              <Formik
                initialValues={formConfig.initialValues}
                validationSchema={formConfig.validationSchema}
                onSubmit={formConfig.onSubmit}
              >
                {({ errors, touched, ...formik }) => (
                  <Form onSubmit={formik.handleSubmit}>
                    <Form.Group controlId="email">
                      <Form.Label>Your Email</Form.Label>
                      <Form.Control
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="email"
                        value={formik.values.email}
                        type="email"
                        isInvalid={touched.email && errors.email ? true : false}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="password">
                      <Form.Label>Your Password</Form.Label>
                      <Form.Control
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="hash"
                        value={formik.values.hash}
                        type="password"
                        isInvalid={touched.hash && errors.hash ? true : false}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.hash}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Check
                      id="remember"
                      name="remember"
                      type="checkbox"
                      label="Remember me"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.remember}
                    />
                    <Button
                      type="submit"
                      variant="primary"
                      className="mt-3"
                      disabled={formik.isSubmitting || !formik.isValid}
                      block
                    >
                      {formik.isSubmitting ? (
                        <Spinner animation="border" size="sm" />
                      ) : (
                        'Log In'
                      )}
                    </Button>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

Login.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
}

Login.defaultProps = {
  isAuthenticated: false,
}

export default withRouter(
  connect((state: { auth: any }) => ({
    isAuthenticated: !!state.auth.token,
  }))(Login)
)
