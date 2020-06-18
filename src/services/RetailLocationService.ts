import { http } from '../utils/http'

class RetailLocationService {
  fetchByManufacturer = (manufacturerId: string): Promise<any> => {
    const formData = new FormData()
    formData.append('manufacturer_id', manufacturerId)

    return new Promise((resolve, reject) => {
      try {
        http
          .post('retail_location/read_by_manufacturer', formData)
          .then(({ data }) => {
            if (data.code === 200 && data.data.length) {
              const locations = data.data
              const retailers = locations.filter(
                (item: any) => item.manufacturer_id === manufacturerId
              )
              retailers.map((retailer: any) => {
                if (retailer.retail_locations) {
                  retailer.count = retailer.retail_locations.length
                } else {
                  retailer.count = 0
                }
                return retailer
              })

              resolve(retailers)
            } else {
              resolve([])
            }
          })
      } catch (error) {
        reject(error)
        throw error
      }
    })
  }
}

export const fetchByManufacturer = (manufacturerId: string): Promise<any> => {
  const formData = new FormData()
  formData.append('manufacturer_id', manufacturerId)

  return new Promise((resolve, reject) => {
    try {
      http
        .post('retail_location/read_by_manufacturer', formData)
        .then(({ data }) => {
          const locations = data.data

          if (data.code === 200 && locations.length) {
            const retailers = locations.filter(
              (item: any) => item.manufacturer_id === manufacturerId
            )
            retailers.map((retailer: any) => {
              if (retailer.retail_locations) {
                retailer.count = retailer.retail_locations.length
              } else {
                retailer.count = 0
              }
              return retailer
            })
            resolve(retailers)
          } else if (data.code === 200 && !data.data.length) {
            resolve([])
          } else {
            reject()
          }
        })
    } catch (error) {
      reject(error)
      throw error
    }
  })
}

export default RetailLocationService
