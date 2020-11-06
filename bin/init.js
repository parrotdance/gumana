const fs = require('fs-extra')
const { execSync } = require('child_process')
const {
  SELF_CFG_PATH,
  VERSION,
  getCurrentUser,
  question,
  formatUserInfo,
  addUserPreset
} = require('../src/utils')
const options = require('../src/entries')

const gitExist = () => {
  const version = execSync('git --version')
  return version.includes('git version')
}
const checkCfg = () => fs.statSync(SELF_CFG_PATH).size > 0
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
        const { name, email } = getCurrentUser()
        const userInfo = formatUserInfo(name, email)
        addUserPreset(userInfo)
        console.log(`Current user info has been stored: ${userInfo}`)
        console.log(`\nNext:\n`)
        console.log(`  Please run 'gumana -a' to add a new git user preset.`)
        console.log(`  Then, run 'gumana' again to switch git user.`)
        process.exit(0)
      } else if (opt === 'n') {
        fs.removeSync(SELF_CFG_PATH)
        console.log('Negative. Process exit.')
        process.exit(-1)
      }
    })
  }
}
