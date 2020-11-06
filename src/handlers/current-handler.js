const { getCurrentUser, formatUserInfo } = require('../utils')

module.exports = async function currentHandler() {
  const { name, email } = getCurrentUser()
  console.log(`Current git user: ${formatUserInfo(name, email)}`)
}
