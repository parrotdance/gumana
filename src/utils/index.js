const fs = require('fs-extra')
const { resolve } = require('path')
const homedir = require('os').homedir()
const ora = require('ora')()
const log = console.log
const logSucceed = (text) => ora.succeed(text)
const logFail = (text) => ora.fail(text)
const logWarn = (text) => ora.warn(text)
const logInfo = (text) => ora.info(text)

const GIT_CFG_PATH = resolve(homedir, '.gitconfig')
const SELF_CFG_PATH = resolve(__dirname, '../../temp/.gumanacfg')
const SELF_CFG_DIR = homedir
const VERSION = require('../../package.json').version
let PRESETS = []

function formatUserInfo(name, email) {
  return `${name} <${email}>`
}
function parseUserInfo(userinfo) {
  let [name, email] = userinfo.split(' ')
  email = email.substring(1, email.length - 1)
  return { name, email }
}

function addUserPreset(preset) {
  const trimedUserInfo = preset.trim()
  if (PRESETS.includes(trimedUserInfo)) {
    logWarn(
      `Exist userinfo: ${preset}, just run 'gumana' to select a new identify.`
    )
  } else {
    fs.ensureFileSync(SELF_CFG_PATH)
    fs.appendFileSync(SELF_CFG_PATH, preset + '\n')
  }
}

function getUserSectionPos(configStr) {
  const length = configStr.length
  let title = configStr.indexOf('[user]')
  let p1 = title
  while (p1 < length && configStr[p1 - 1] !== ']') {
    p1++
  }
  let p2 = p1
  while (p2 < length && configStr[p2] !== '[') {
    p2++
  }
  if (p1 === p2) throw new Error('Invalid .gitconfig file')
  return { titleStart: title, start: p1, end: p2 }
}

function getCurrentUser() {
  const gitConfig = fs.readFileSync(GIT_CFG_PATH, 'utf-8')
  const { start, end } = getUserSectionPos(gitConfig)
  const userSection = gitConfig.substring(start, end)
  const [userLine, emailLine] = userSection.split('\n').filter((v) => v)
  const name = userLine.split('=')[1].trim()
  const email = emailLine.split('=')[1].trim()
  return { name, email }
}

function getPresets() {
  if (PRESETS.length === 0) {
    PRESETS = fs
      .readFileSync(SELF_CFG_PATH, 'utf-8')
      .split('\n')
      .filter((v) => v)
      .map((v) => v.trim())
  }
  return PRESETS
}

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})
const question = (quest, callback) => {
  return new Promise((resolve, reject) => {
    readline.question(quest, (answer) => {
      callback(answer)
      resolve()
    })
  })
}

module.exports = {
  GIT_CFG_PATH,
  SELF_CFG_PATH,
  SELF_CFG_DIR,
  VERSION,
  log,
  logSucceed,
  logFail,
  logWarn,
  logInfo,
  question,
  formatUserInfo,
  parseUserInfo,
  getCurrentUser,
  getPresets,
  addUserPreset,
  getUserSectionPos
}
