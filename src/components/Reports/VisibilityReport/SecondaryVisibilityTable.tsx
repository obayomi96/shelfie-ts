import * as React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'react-bootstrap'
import { IoIosCheckmarkCircle, IoIosCloseCircle } from 'react-icons/io'

import { colors } from '../../../data/theme'

interface IProps {
  visibilityData: { data: any[]; sortedData: any[]; columns: any[] }
}

const SecondaryVisibilityTable: React.FunctionComponent<IProps> = ({
  visibilityData,
}) => (
  <Table className="table-fit" striped bordered hover responsive>
    <thead>
      <tr>
        <th scope="col" colSpan={3}>
          Store
        </th>
        <th scope="col" colSpan={3}>
          Category
        </th>
        {visibilityData.columns.slice(3).map((timestamp, index) => (
          <th key={index} colSpan={3} scope="col" className="text-primary">
            {timestamp}
          </th>
        ))}
      </tr>
      <tr className="text-muted">
        <th scope="col" colSpan={3}></th>
        <th scope="col" colSpan={3}></th>
        {visibilityData.columns.slice(3).map((timestamp, index) => (
          <React.Fragment key={index}>
            <th scope="col">Front Row Position</th>
            <th scope="col">Correct Communication</th>
            <th scope="col">Near Impulse Category</th>
          </React.Fragment>
        ))}
      </tr>
    </thead>
    <tbody>
      {visibilityData.sortedData.map((store) => {
        return store.categories.map((category, index) => (
          <React.Fragment key={category._id}>
            <tr>
              <td className="text-primary font-weight-bold" colSpan={3}>
                {index === 0 ? <span>{store.name}</span> : null}
              </td>

              <td className="font-weight-bold" colSpan={3}>
                {category.name}
              </td>

              {category.details.map((detail) => (
                <React.Fragment key={detail.timestamp}>
                  <td className="text-center">
                    {detail.home_shelf === 'true' ? (
                      <IoIosCheckmarkCircle size={20} color={colors.success} />
                    ) : detail.home_shelf === 'false' ? (
                      <IoIosCloseCircle size={20} color={colors.danger} />
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="text-center">
                    {detail.placement_compliance === 'true' ? (
                      <IoIosCheckmarkCircle size={20} color={colors.success} />
                    ) : detail.placement_compliance === 'false' ? (
                      <IoIosCloseCircle size={20} color={colors.danger} />
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="text-center">
                    {detail.near_impulse === 'true' ? (
                      <IoIosCheckmarkCircle size={20} color={colors.success} />
                    ) : detail.near_impulse === 'false' ? (
                      <IoIosCloseCircle size={20} color={colors.danger} />
                    ) : (
                      '-'
                    )}
                  </td>
                </React.Fragment>
              ))}
            </tr>
          </React.Fragment>
        ))
      })}
    </tbody>
  </Table>
)

SecondaryVisibilityTable.propTypes = {
  visibilityData: PropTypes.any.isRequired,
}

export default SecondaryVisibilityTable
