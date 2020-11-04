const fs = require('fs-extra')
const { execSync } = require('child_process')
const {
  SELF_CFG_PATH,
  CURRENT_USER,
  VERSION,
  question,
  formatUserInfo,
  addUser
} = require('../src/utils')
const options = require('./options')

const gitExist = () => {
  const version = execSync('git --version')
  return version.includes('git version')
}
const checkCfg = () => fs.existsSync(SELF_CFG_PATH)
const welcome = `
Thanks for using gumana.
But we can not find .guconfig at: ${SELF_CFG_PATH}
Would you like to create this config file automaticly? (y/n) `

module.exports = async function init() {
  const cfg = require('yargs')(process.argv.slice(2))
  options.forEach(({ flag, fullFlag, desc }) =>
    cfg.alias(flag, fullFlag).describe(flag, desc)
  )
  cfg.alias('v', 'Version').version('v', 'version of gumana', VERSION)
  cfg.alias('h', 'help').help('h', 'Show this help page')
  process._cfg = cfg

  if (!gitExist()) {
    console.warn(
      'It seems git is not installed in this machine, please check it out before using gumana'
    )
    process.exit(-1)
  }
  if (!checkCfg()) {
    // First time run gumana
    await question(welcome, (opt) => {
      if (opt === 'y') {
        fs.writeFileSync(SELF_CFG_PATH, '')
        const userInfo = formatUserInfo(CURRENT_USER.name, CURRENT_USER.email)
        addUser(userInfo)
      } else if (opt === 'n') {
        console.log('Negative. Process exit.')
        process.exit(-1)
      }
    })
  }
}
