const fs = require('fs-extra')
const { execSync } = require('child_process')
const {
  SELF_CFG_PATH,
  SELF_CFG_DIR,
  VERSION,
  getCurrentUser,
  question,
  formatUserInfo,
  addUserPreset,
  logSucceed,
  log,
  logWarn
} = require('../src/utils')
const options = require('../src/entries')

const gitExist = () => {
  const version = execSync('git --version')
  return version.includes('git version')
}
const checkCfg = () =>
  fs.existsSync(SELF_CFG_PATH) && fs.statSync(SELF_CFG_PATH).size > 0
const welcome = (user) => `
It seems like this is the first time you run 'gumana'.
Your current git user is => ${user}
Please run 'gumana -a' to add another user preset,
then run 'gumana' again to select between them`

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
    const { name, email } = getCurrentUser()
    const preset = formatUserInfo(name, email)
    addUserPreset(preset)
    console.log(welcome(preset))
    process.exit(0)
  }
}
