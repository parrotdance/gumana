const fs = require('fs-extra')
const { SELF_CFG_PATH, question, formatUserInfo } = require('./utils')

module.exports = async function addHandler() {
  if (fs.existsSync(SELF_CFG_PATH)) {
    let name, email
    const writeName = (v) => (name = v)
    const writeEmail = (v) => (email = v)
    await question('Please input username:\n', writeName)
    await question('Please input email:\n', writeEmail)
    const newUserInfo = formatUserInfo(name, email)
    const presets = fs
      .readFileSync(SELF_CFG_PATH, 'utf-8')
      .split('\n')
      .filter((v) => v)
    if (presets.includes(newUserInfo)) {
      console.log(
        `Exist userinfo: ${newUserInfo}, just run 'gumana' to select a new identify`
      )
    } else {
      presets.push(newUserInfo)
    }
    fs.writeFileSync(SELF_CFG_PATH, newUserInfo)
  }
}
