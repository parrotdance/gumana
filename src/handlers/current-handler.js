const { getCurrentUser, formatUserInfo } = require('../utils')
const { logInfo } = require('../utils/log')

module.exports = async function currentHandler() {
  const { name, email } = getCurrentUser()
  logInfo(`Current git user: ${formatUserInfo(name, email)}`)
}
