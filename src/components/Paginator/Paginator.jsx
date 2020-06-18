import React from 'react'
import PropTypes from 'prop-types'
import { Pagination } from 'react-bootstrap'

// interface IProps {
//   dataListPerPage: number,
//   totalDataList: number,
//   paginate: (arg1: number) => void,
//   currentPage: number
// }

const Paginator = ({
  dataListPerPage,
  totalDataList,
  paginate,
  currentPage,
}) => {
  const pageNumbers = []
  // Check total amount to paginated data in order not to display more pagination than needed when we have just one page maybe after sorting by status.

  for (let i = 1; i <= Math.ceil(totalDataList / dataListPerPage); i++) {
    if (totalDataList < 10 || totalDataList > 10) {
      pageNumbers.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => paginate(i)}
        >
          {i}
        </Pagination.Item>
      )
    }
  }

  return (
    <div className="contentWrapper">
      <Pagination>{pageNumbers}</Pagination>
    </div>
  )
}

Paginator.propTypes = {
  dataListPerPage: PropTypes.number.isRequired,
  totalDataList: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
}

export default Paginator
