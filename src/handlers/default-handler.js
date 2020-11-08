const {
  getPresets,
  getCurrentUser,
  question,
  getUserSectionPos,
  parseUserInfo,
  GIT_CFG_PATH,
  formatUserInfo,
  logFail,
  logSucceed,
  logWarn
} = require('../utils')
const fs = require('fs-extra')

module.exports = async function defaultHandler() {
  const presets = getPresets()
  const { name, email } = getCurrentUser()
  const currentUser = formatUserInfo(name, email)
  const listStr = presets
    .map((s, i) =>
      s === currentUser ? `${i + 1}) ${s} (current)` : `${i + 1}) ${s}`
    )
    .join('\n') // plus 1 for user experience
  if (presets.length < 2) {
    const onlyOneWarning = `There is only one preset:\n${listStr}\n\nPlease run 'gumana -a' to add another preset.`
    logWarn(onlyOneWarning)
  } else {
    const questionStr = `Stored git user presets: \n${listStr}\n\nPlease select user by index of preset (e.g. 1): `
    await question(questionStr, (string) => {
      const index = Number(string)
      if (Number.isNaN(index)) {
        logFail(`Invalid input. Please input a number.`)
      } else {
        const targetUser = presets[index - 1]
        if (targetUser) {
          const gitConfig = fs.readFileSync(GIT_CFG_PATH, 'utf-8')
          const { titleStart, end } = getUserSectionPos(gitConfig)
          const { name, email } = parseUserInfo(targetUser.trim())
          const newUser = `\n[user]\n\tname = ${name}\n\temail = ${email}\n`
          const newConfig =
            gitConfig.substring(0, titleStart) +
            newUser +
            gitConfig.substring(end)
          fs.writeFileSync(GIT_CFG_PATH, newConfig)
          logSucceed(`Git user has been set => ${targetUser.trim()}`)
        } else {
          logFail(`Invalid input. Please input correct index of presets.`)
        }
      }
    })
  }
}
