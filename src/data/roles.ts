const supliasAdmin = 'suplias_admin'
const supliasAccountManager = 'suplias_acct_mgr'
const fmcgAdmin = 'fmcg_admin'
const distributorManager = 'distributor_manager'
const salesRep = 'sales_rep'
const allAdmins = [supliasAdmin, fmcgAdmin]

export default {
  supliasAdmin,
  supliasAccountManager,
  fmcgAdmin,
  distributorManager,
  salesRep,
  all: [supliasAdmin, ...allAdmins]
}
