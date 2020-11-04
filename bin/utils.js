const fs = require('fs-extra')
const { resolve } = require('path')
const homedir = require('os').homedir()

const GIT_CFG_PATH = resolve(homedir, '.gitconfig')
const SELF_CFG_PATH = resolve(homedir, '.gumanacfg')
const CURRENT_USER = readUser(GIT_CFG_PATH)
const VERSION = require('../package.json').version

function formatUserInfo(name, email) {
  return `${name} <${email}>`
}

function addUser(newUserInfo) {
  const presets = fs
    .readFileSync(SELF_CFG_PATH, 'utf-8')
    .split('\n')
    .filter((v) => v)
    .map((v) => v.trim())
  const trimedUserInfo = newUserInfo.trim()
  if (presets.includes(trimedUserInfo)) {
    console.log(
      `Exist userinfo: ${newUserInfo}, just run 'gumana' to select a new identify.`
    )
  } else {
    presets.push(trimedUserInfo)
    fs.writeFileSync(SELF_CFG_PATH, presets.join('\n') + '\n')
    console.log(`Add user info successful: ${newUserInfo}\n`)
  }
}

function readUser(path) {
  const gitConfig = fs.readFileSync(path, 'utf-8')
  const length = gitConfig.length
  let p1 = gitConfig.indexOf('[user]')
  while (p1 < length && gitConfig[p1 - 1] !== ']') {
    p1++
  }
  let p2 = p1
  while (p2 < length && gitConfig[p2] !== '[') {
    p2++
  }
  if (p1 === p2) throw new Error('Invalid .gitconfig file')
  const userSection = gitConfig.substring(p1, p2)
  const [userLine, emailLine] = userSection.split('\n').filter((v) => v)
  const name = userLine.split('=')[1].trim()
  const email = emailLine.split('=')[1].trim()
  return { name, email }
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
  CURRENT_USER,
  VERSION,
  question,
  formatUserInfo,
  addUser
}
