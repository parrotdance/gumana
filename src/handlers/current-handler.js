const { CURRENT_USER, formatUserInfo } = require('../utils')

module.exports = async function currentHandler() {
  const user = formatUserInfo(CURRENT_USER.name, CURRENT_USER.email)
  console.log(`Current git user: ${user}`)
}
