import React from 'react'
import { connect } from 'react-redux'

import { Card, Container } from 'react-bootstrap'
import Header from '../components/Layout/Header'

interface IProps {
  user: any
}

const Dashboard: React.FunctionComponent<IProps> = ({ user }) => {
  return (
    <>
      <Header title="Dashboard" hasBack={false} />
      <div className="pageContent">
        <Container>
          <Card>
            <Card.Header>
              <Card.Title>Welcome to Shelfie</Card.Title>
            </Card.Header>
            <Card.Body>
              I'm logged in as <b>{user.name}</b>, with {` `}
              email <b>{user.email}</b>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </>
  )
}

export default connect((state: { user: any }) => ({
  user: state.user,
}))(Dashboard)
