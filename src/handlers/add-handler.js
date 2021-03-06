const fs = require('fs-extra')
const {
  SELF_CFG_PATH,
  question,
  formatUserInfo,
  addUserPreset
} = require('../utils')
const { logSucceed } = require('../utils/log')

module.exports = async function addHandler() {
  if (fs.existsSync(SELF_CFG_PATH)) {
    let name, email
    const writeName = (v) => (name = v)
    const writeEmail = (v) => (email = v)
    await question('Please input username: ', writeName)
    await question('Please input email: ', writeEmail)
    const newUserInfo = formatUserInfo(name, email)
    addUserPreset(newUserInfo)
    logSucceed(`New user has been added => ${newUserInfo}`)
  }
}
