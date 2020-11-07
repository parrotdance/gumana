const { getCurrentUser, formatUserInfo, logInfo } = require('../utils')

module.exports = async function currentHandler() {
  const { name, email } = getCurrentUser()
  logInfo(`Current git user: ${formatUserInfo(name, email)}`)
}
