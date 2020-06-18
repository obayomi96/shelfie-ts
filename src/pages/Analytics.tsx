import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Tabs, Tab } from 'react-bootstrap'
import { Card, Container } from 'react-bootstrap'

import Header from '../components/Layout/Header'
import { IUser } from '../interfaces/user'

import SalesReport from '../components/Reports/SalesReport'
import OutOfStockReport from '../components/Reports/OutOfStockReport'
import InventoryReport from '../components/Reports/InventoryReport'
import VisibilityReport from '../components/Reports/VisibilityReport/VisibilityReport'

import RetailLocationService from '../services/RetailLocationService'
import { IRetailStore } from '../interfaces/store'

interface IProps {
  user: IUser
}

// instantiate needed services
const retailLocationService = new RetailLocationService()

const Analytics: React.FunctionComponent<IProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<string>('sales')
  const [store, setStore] = useState<string>('')
  const [stores, setStores] = useState<IRetailStore[]>([])

  React.useEffect(() => {
    const loadData = (): void => {
      if (user.manufacturer_id) {
        retailLocationService
          .fetchByManufacturer(user.manufacturer_id)
          .then((retailers: any) => {
            // console.log(retailers)
            setStores(retailers)
          })
      }
    }
    loadData()
  }, [user.manufacturer_id])

  return (
    <>
      <Header title="Shelfie-panel" hasBack={false} />
      <div className="pageContent">
        <Container>
          <Card>
            <Card.Header>
              <Tabs
                id="analytics-tabs"
                variant="pills"
                activeKey={activeTab}
                onSelect={(tab) => setActiveTab(tab)}
              >
                <Tab eventKey="sales" title="Sales" />
                <Tab eventKey="outOfStock" title="Out of Stock" />
                <Tab eventKey="inventory" title="Inventory" />
                <Tab eventKey="primary_visibility" title="Primary Visibility" />
                <Tab
                  eventKey="secondary_visibility"
                  title="Secondary Visibility"
                />
                <Tab eventKey="profile" title="Pricing" disabled />
                <Tab eventKey="competition" title="Competition" disabled />
              </Tabs>
            </Card.Header>
            {activeTab === 'sales' && (
              <SalesReport store={store} setStore={setStore} stores={stores} />
            )}
            {activeTab === 'outOfStock' && (
              <OutOfStockReport
                store={store}
                setStore={setStore}
                stores={stores}
              />
            )}
            {activeTab === 'inventory' && (
              <InventoryReport
                store={store}
                setStore={setStore}
                stores={stores}
              />
            )}
            {activeTab === 'primary_visibility' && (
              <VisibilityReport
                type="primary"
                store={store}
                setStore={setStore}
                stores={stores}
              />
            )}
            {activeTab === 'secondary_visibility' && (
              <VisibilityReport
                type="secondary"
                store={store}
                setStore={setStore}
                stores={stores}
              />
            )}
          </Card>
        </Container>
      </div>
    </>
  )
}

Analytics.propTypes = {
  user: PropTypes.any.isRequired,
}

export default connect((state: { user: any }) => ({
  user: state.user,
}))(Analytics)
