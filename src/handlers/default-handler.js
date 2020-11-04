const {
  PRESETS,
  question,
  getUserSectionPos,
  parseUserInfo,
  GIT_CFG_PATH
} = require('../utils')
const fs = require('fs-extra')

module.exports = async function defaultHandler() {
  const list = PRESETS.map((s, i) => `${i + 1}) ${s}`) // plus 1 for user experience
  const listStr = list.join('\n')
  const questionStr = `Stored git user presets: \n${listStr}\n\nPlease select user by index of preset (e.g. 1): `
  await question(questionStr, (string) => {
    const index = Number(string)
    if (Number.isNaN(index)) {
      console.log(`Invalid input. Please input number.`)
    } else {
      const targetUser = PRESETS[index - 1]
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
        console.log(`New user has been set: ${targetUser.trim()}`)
      } else {
        console.log(`Invalid input. Please input correct index of presets.`)
      }
    }
  })
}
