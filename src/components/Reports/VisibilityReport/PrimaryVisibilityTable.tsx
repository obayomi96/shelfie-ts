import * as React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'react-bootstrap'
import { IoIosCheckmarkCircle, IoIosCloseCircle } from 'react-icons/io'

import { colors } from '../../../data/theme'
import { toPercentage } from '../../../utils/filters'

interface IProps {
  visibilityData: { data: any[]; sortedData: any[]; columns: any[] }
}

const PrimaryVisibilityTable: React.FunctionComponent<IProps> = ({
  visibilityData,
}) => (
  <Table className="table-fit" striped bordered hover responsive>
    <thead>
      <tr>
        <th scope="col" colSpan={4}>
          Store
        </th>
        <th scope="col" colSpan={4}>
          Category
        </th>
        {visibilityData.columns.slice(3).map((timestamp, index) => (
          <th key={index} colSpan={4} scope="col" className="text-primary">
            {timestamp}
          </th>
        ))}
      </tr>
      <tr className="text-muted">
        <th scope="col" colSpan={4}></th>
        <th scope="col" colSpan={4}></th>
        {visibilityData.columns.slice(3).map((timestamp, index) => (
          <React.Fragment key={index}>
            <th scope="col">Shelf Share</th>
            <th scope="col">Eye Level</th>
            <th scope="col">Planogram Compliant</th>
            <th scope="col">Strip Present</th>
          </React.Fragment>
        ))}
      </tr>
    </thead>
    <tbody>
      {visibilityData.sortedData.map((store) => {
        return store.categories.map((category, index) => (
          <React.Fragment key={category._id}>
            <tr>
              <td className="text-primary font-weight-bold" colSpan={4}>
                {index === 0 ? <span>{store.name}</span> : null}
              </td>

              <td className="font-weight-bold" colSpan={4}>
                {category.name}
              </td>
              {category.details.map((detail) => (
                <React.Fragment key={detail.timestamp}>
                  <td className="text-center">
                    {detail.share === 'no-entry'
                      ? '-'
                      : toPercentage(detail.share)}
                  </td>
                  <td className="text-center">
                    {detail.eye_level === 'true' ? (
                      <IoIosCheckmarkCircle size={20} color={colors.success} />
                    ) : detail.eye_level === 'false' ? (
                      <IoIosCloseCircle size={20} color={colors.danger} />
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="text-center">
                    {detail.planogram_compliant === 'true' ? (
                      <IoIosCheckmarkCircle size={20} color={colors.success} />
                    ) : detail.planogram_compliant === 'false' ? (
                      <IoIosCloseCircle size={20} color={colors.danger} />
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="text-center">
                    {detail.strip_present === 'true' ? (
                      <IoIosCheckmarkCircle size={20} color={colors.success} />
                    ) : detail.strip_present === 'false' ? (
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

PrimaryVisibilityTable.propTypes = {
  visibilityData: PropTypes.any.isRequired,
}

export default PrimaryVisibilityTable
