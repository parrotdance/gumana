const { getPresets, logInfo } = require('../utils')

module.exports = async function listHandler() {
  const presets = getPresets()
  logInfo('Stored git user presets: ')
  console.log(presets.map((v, i) => `${i + 1}) ${v}`).join('\n'))
}
