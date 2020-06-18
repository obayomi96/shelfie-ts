import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker'

import { Card, Form, ListGroup } from 'react-bootstrap'
import { Button, Spinner, Table } from 'react-bootstrap'

import ReportService from '../../services/ReportService'
import { IUser } from '../../interfaces/user'
interface IProps {
  user: IUser
  store: string
  setStore: (id: string) => void
  stores: any[]
}

const OutOfStock: React.FunctionComponent<IProps> = ({
  user,
  store,
  setStore,
  stores,
}) => {
  const reportService = new ReportService()

  const [date, setDate] = useState<Date | null>(new Date())
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [salesData, setSalesData] = useState<any>({
    data: [],
    columns: [],
    categories: {},
  })

  const refreshAnalytics = (): void => {
    setIsLoading(true)
    const year = date ? date.getFullYear().toString() : ''
    const month = date ? (date.getMonth() + 1).toString() : ''

    reportService
      .fetchOutOfStock(year, month, user.manufacturer_id, store)
      .then((sales: any) => {
        // console.log(sales)
        setSalesData({
          data: sales.data,
          columns: sales.columns,
          categories: sales.filters.categories,
        })
        setIsLoading(false)
      })
  }

  return (
    <>
      <ListGroup variant="flush">
        <ListGroup.Item className="d-flex align-items-center justify-content-between">
          <Form.Control
            as="select"
            size="sm"
            value={store}
            className="w-auto"
            onChange={({ target }: { target: any }) => setStore(target.value)}
          >
            <option value="">Select location</option>
            {stores.length &&
              stores.map((store) => (
                <option key={store._id} value={store._id}>
                  {store.name}
                </option>
              ))}
          </Form.Control>

          <div className="d-flex align-items-center">
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              dateFormat="MMMM, yyyy"
              className="form-control form-control-sm"
              showMonthYearPicker
            />
            <Button
              size="sm"
              className="ml-2"
              disabled={!store || !date || isLoading}
              onClick={refreshAnalytics}
            >
              Refresh
            </Button>
          </div>
        </ListGroup.Item>
      </ListGroup>
      <Card.Body>
        {!isLoading && salesData.data.length ? (
          <Table className="table-fit" striped bordered hover responsive>
            <thead>
              <tr>
                {/* <th scope="col">S/N</th> */}
                {/* <th scope="col">Category</th> */}
                <th scope="col" className="sticky">
                  Product
                </th>
                <th scope="col">Code</th>
                <th scope="col">Price</th>
                {salesData.columns.slice(2).map((timestamp, index) => (
                  <th
                    key={index}
                    colSpan={5}
                    scope="col"
                    className="text-primary"
                  >
                    {timestamp}
                  </th>
                ))}
              </tr>
              <tr>
                {/* <th scope="col"></th> */}
                {/* <th scope="col"></th> */}
                <th scope="col" className="sticky">
                  —
                </th>
                <th scope="col"></th>
                <th scope="col"></th>
                {salesData.columns.slice(2).map((timestamp, index) => (
                  <React.Fragment key={index}>
                    <th scope="col" className="text-muted">
                      Good
                    </th>
                    <th scope="col" className="text-muted">
                      Low
                    </th>
                    <th scope="col" className="text-muted">
                      Very Low
                    </th>
                    <th scope="col" className="text-muted">
                      Critically Low
                    </th>
                    <th scope="col" className="text-muted">
                      Zero Stock
                    </th>
                  </React.Fragment>
                ))}
              </tr>
            </thead>
            <tbody>
              {salesData.data.map((category) => (
                <React.Fragment key={category.id}>
                  <tr>
                    {/* <td></td> */}
                    <td className="sticky text-primary font-weight-bold">
                      {category.name}
                    </td>
                    <td colSpan={salesData.columns.length * 2}></td>
                  </tr>
                  {category.products.map((product) => (
                    <tr key={product._id}>
                      {/* <td></td> */}
                      {/* <td></td> */}
                      <td className="sticky">{product.name}</td>
                      <td>{product.sku_id}</td>
                      <td>{product.price}</td>
                      {Object.values(product.dates).map(
                        (detail: any, index) => (
                          <React.Fragment key={index}>
                            <td>
                              {detail.good ? (
                                <span>{detail.good.days_left}</span>
                              ) : (
                                <span>-</span>
                              )}
                            </td>
                            <td>
                              {detail.low ? (
                                <span>{detail.low.days_left}</span>
                              ) : (
                                <span>-</span>
                              )}
                            </td>
                            <td>
                              {detail.very_low ? (
                                <span>{detail.very_low.days_left}</span>
                              ) : (
                                <span>-</span>
                              )}
                            </td>
                            <td>
                              {detail.critically_low ? (
                                <span>{detail.critically_low.days_left}</span>
                              ) : (
                                <span>-</span>
                              )}
                            </td>
                            <td>
                              {detail.zero_stock ? (
                                <span>{detail.zero_stock.days_left}</span>
                              ) : (
                                <span>-</span>
                              )}
                            </td>
                          </React.Fragment>
                        )
                      )}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </Table>
        ) : null}

        {!isLoading && !salesData.data.length ? (
          <div className="d-flex justify-content-center my-4">
            {store ? (
              <span>No out of stock report available</span>
            ) : (
              <span>Set filters and refresh to see out of stock report</span>
            )}
          </div>
        ) : null}

        {isLoading && (
          <div className="d-flex justify-content-center my-4">
            <Spinner animation="border" />
          </div>
        )}
      </Card.Body>
    </>
  )
}

OutOfStock.propTypes = {
  user: PropTypes.object.isRequired,
  store: PropTypes.string.isRequired,
  setStore: PropTypes.func.isRequired,
  stores: PropTypes.array.isRequired,
}

export default connect((state: { user: any; auth: any }) => ({
  user: state.user,
}))(OutOfStock)
