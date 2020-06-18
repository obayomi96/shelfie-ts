import roles from './roles'

const {
  all,
  fmcgAdmin,
  distributorManager,
  salesRep
} = roles

export default [
  {id: 'view_fmcgs', role: [fmcgAdmin, ...all] },
  {id: 'create_fmcg', role: [fmcgAdmin, ...all] },
  {id: 'update_fmg', role: [fmcgAdmin, ...all] },

  {id: 'view_distributors', role: [distributorManager, ...all] },
  {id: 'create_distributors', role: [distributorManager, ...all] },
  {id: 'update_distributors', role: [distributorManager, ...all] },

  {id: 'view_sales_reps', role: [salesRep, ...all] },
  {id: 'create_sales_rep', role: [salesRep, ...all] },
  {id: 'update_sales_rep', role: [salesRep, ...all] },

]
