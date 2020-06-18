import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker'

import { Card, Form, ListGroup } from 'react-bootstrap'
import { Button, Spinner, InputGroup } from 'react-bootstrap'

import PrimaryVisibilityTable from './PrimaryVisibilityTable'
import SecondaryVisibilityTable from './SecondaryVisibilityTable'

import ReportService from '../../../services/ReportService'
import { IUser } from '../../../interfaces/user'

interface IProps {
  type: string
  user: IUser
  store: string
  setStore: (id: string) => void
  stores: any[]
}
interface IState {
  startDate: Date
  endDate: Date
  period: string
  isLoading: boolean
  visibilityData: any
  updatedAt: Date
}

class VisibilityReport extends React.Component<IProps, IState> {
  reportService: any

  static propTypes = {
    user: PropTypes.object.isRequired,
    setStore: PropTypes.func.isRequired,
    stores: PropTypes.array.isRequired,
  }

  static defaultProps = {
    type: 'primary',
  }

  constructor(props) {
    super(props)

    this.state = {
      startDate: new Date('2020/05/05'),
      endDate: new Date('2020/05/31'),
      period: 'day',
      isLoading: false,
      visibilityData: { data: [], sortedData: [], columns: [] },
      updatedAt: null,
    }

    this.reportService = new ReportService()
  }

  /**
   *
   * @param type - Period Type
   * @param quantity - Period Quantity
   */
  _computeTTL = (type: string, quantity = 1): string => {
    let ttl = 0
    switch (type) {
      case 'week':
        ttl = 604800 * quantity
        break
      case 'month':
        ttl = 2592000 * quantity
        break
      case 'quater':
        ttl = 7776000 * quantity
        break
      default:
        ttl = 86400 * quantity
        break
    }
    return ttl.toString()
  }

  _sortVisibilityData = (): void => {
    const { visibilityData } = this.state

    let sortedData
    if (this.props.store.trim() !== '') {
      sortedData = visibilityData.data.filter(
        ({ _id: storeId }) => storeId === this.props.store
      )
    } else {
      sortedData = visibilityData.data
    }

    this.setState({
      ...this.state,
      visibilityData: {
        ...visibilityData,
        sortedData,
      },
    })
  }

  refreshAnalytics = (): void => {
    this.setState({ ...this.state, isLoading: true })

    const { startDate, endDate, period } = this.state

    const startTime = startDate ? (startDate.getTime() / 1000).toString() : ''
    const endTime = endDate ? (endDate.getTime() / 1000).toString() : ''
    const periodTTL = this._computeTTL(period)

    this.reportService
      .fetchVisibility(
        startTime,
        endTime,
        periodTTL,
        this.props.user.manufacturer_id
      )
      .then((sales: any) => {
        // console.log(sales)
        this.setState({
          ...this.state,
          visibilityData: {
            data: sales.data,
            sortedData: sales.data,
            columns: sales.columns,
          },
          isLoading: false,
        })
        this._sortVisibilityData()
      })
  }

  componentDidUpdate(prevProp): void {
    const { store } = this.props

    if (prevProp.store !== store) {
      this.setState({
        ...this.state,
        isLoading: true,
      })
      this._sortVisibilityData()
    }
  }

  render(): React.ReactNode {
    const { type, store, setStore, stores } = this.props
    const { startDate, endDate, period, visibilityData, isLoading } = this.state

    return (
      <>
        <ListGroup variant="flush">
          <ListGroup.Item className="d-flex align-items-center justify-content-between">
            <Form.Control
              as="select"
              size="sm"
              className="w-auto"
              value={store}
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
              <InputGroup>
                <DatePicker
                  selected={startDate}
                  onChange={(date: Date) =>
                    this.setState({ ...this.state, startDate: date })
                  }
                  startDate={startDate}
                  endDate={endDate}
                  className="form-control form-control-sm date"
                />
                <DatePicker
                  selected={endDate}
                  onChange={(date: Date) =>
                    this.setState({ ...this.state, endDate: date })
                  }
                  startDate={startDate}
                  endDate={endDate}
                  className="form-control form-control-sm date"
                />
              </InputGroup>
              <Form.Control
                as="select"
                size="sm"
                className="w-auto ml-3"
                value={period}
                onChange={({ target }: { target: any }) =>
                  this.setState({ ...this.state, period: target.value })
                }
              >
                <option value="day">Day</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
                <option value="quater">Quater</option>
              </Form.Control>
              <Button
                size="sm"
                className="ml-2"
                disabled={!startDate || !endDate || !period || isLoading}
                onClick={this.refreshAnalytics}
              >
                Refresh
              </Button>
            </div>
          </ListGroup.Item>
        </ListGroup>
        <Card.Body>
          {!isLoading && visibilityData.sortedData.length ? (
            <>
              {type === 'secondary' ? (
                <SecondaryVisibilityTable visibilityData={visibilityData} />
              ) : (
                <PrimaryVisibilityTable visibilityData={visibilityData} />
              )}
            </>
          ) : null}

          {!isLoading && !visibilityData.sortedData.length ? (
            <div className="d-flex justify-content-center my-4">
              {store ? (
                <span>No visibility report available for this store</span>
              ) : (
                <span>Set filters and refresh to see visibility report</span>
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
}

export default connect((state: { user: any; auth: any }) => ({
  user: state.user,
}))(VisibilityReport)
