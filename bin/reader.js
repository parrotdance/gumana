const fs = require('fs-extra')
const { resolve } = require('path')
const homedir = require('os').homedir()
const configFile = resolve(homedir, '.gitconfig')

const getConfigFile = () => {
  if (fs.ensureFileSync(configFile)) {
    // TODO: read file and 
  } else {
    // TODO: write file 
  }
}

module.exports = getConfigFile