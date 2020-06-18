import { http } from '../utils/http'

class ReportService {
  /**
   * Reports that have product categories..
   * I'm sure I'll come up with a better explanation.
   * That's all I've got for now.
   *
   * @param data
   */
  _refineReport(data: {
    data: any[]
    filters: any
  }): { id: string; name: string; products: any[] }[] {
    const categories_data = data.filters.categories
    // console.log(sales)

    const categories_array = [] // array for categories id, name and products

    Object.entries(data.data).forEach((item) => {
      const categoryId: string = item[0] // get category_id
      const categoryProducts: any = item[1] // get category products info

      const products_array = [] // array for products in single category
      Object.entries(categoryProducts).forEach((item) => {
        const productId: string = item[0] // get product_id
        const product: any = item[1] // get product info
        product._id = productId // add product _id to product info object
        products_array.push(product)
      })

      categories_array.push({
        id: categoryId,
        name: categories_data[categoryId],
        products: products_array,
      })
    })

    return categories_array
  }

  /**
   * Sales report by retail location
   *
   * @param year
   * @param month
   * @param manufacturerId
   * @param retailLocationId
   */
  fetchSales(
    year: string,
    month: string,
    manufacturerId: string,
    retailLocationId: string
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const formData = new FormData()
      formData.append('month', month)
      formData.append('year', year)
      formData.append('manufacturer', manufacturerId)
      formData.append('retail_location_id', retailLocationId)

      try {
        http.post(`report/sales`, formData).then(({ data }) => {
          if (data.code === 200) {
            const sales = data.data
            sales.data = this._refineReport(sales)
            resolve(sales)
          } else {
            reject()
          }
        })
      } catch (error) {
        reject(error)
      }
    })
  }

  /**
   * Out of stock report by retail location
   *
   * @param year
   * @param month
   * @param manufacturerId
   * @param retailLocationId
   */
  fetchOutOfStock(
    year: string,
    month: string,
    manufacturerId: string,
    retailLocationId: string
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const formData = new FormData()
      formData.append('year', year)
      formData.append('month', month)
      formData.append('manufacturer', manufacturerId)
      formData.append('retail_location_id', retailLocationId)

      try {
        http.post(`report/out_of_stock`, formData).then(({ data }) => {
          if (data.code === 200) {
            const outOfStock = data.data
            outOfStock.data = this._refineReport(outOfStock)
            resolve(outOfStock)
          } else {
            reject()
          }
        })
      } catch (error) {
        reject(error)
      }
    })
  }

  /**
   * Primary visibility report
   *
   * @param startDate
   * @param endDate
   * @param period
   * @param manufacturerId
   */
  fetchVisibility(
    startDate: string,
    endDate: string,
    period: any,
    manufacturerId
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const formData = new FormData()
      formData.append('from_timestamp', startDate)
      formData.append('to_timestamp', endDate)
      formData.append('period', period)
      formData.append('manufacturer', manufacturerId)
      formData.append('type', 'pri')

      try {
        http.post(`report/visibility`, formData).then(
          ({ data }) => {
            if (data.code === 200) {
              const visibility = data.data
              const stores = visibility.filters.stores
              const categories = visibility.filters.categories

              const stores_array = []

              // loop through an object of storeId:storeData pairs
              Object.entries(visibility.data).forEach((item) => {
                const [storeId, storeData] = item

                const categories_array = []

                // loop through an object of categoryId:categoryData pairs in storeData
                Object.entries(storeData).forEach((item) => {
                  const [categoryId, categoryData] = item

                  const data_array = []

                  // loop through an object of timestamp:data pairs in categoryData
                  Object.entries(categoryData).forEach((item) => {
                    const [timestamp, data] = item

                    data['timestamp'] = timestamp // add timestamp to data
                    data_array.push(data) // add to data array
                  })

                  categories_array.push({
                    _id: categoryId,
                    name: categories[categoryId],
                    details: data_array,
                  })
                })

                stores_array.push({
                  _id: storeId,
                  name: stores[storeId],
                  categories: categories_array,
                })
              })

              visibility.data = stores_array
              resolve(visibility)
            } else {
              reject(data)
            }
          },
          () => reject()
        )
      } catch (error) {
        reject(error)
        throw error
      }
    })
  }
}

export default ReportService
