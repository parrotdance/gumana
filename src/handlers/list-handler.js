const { getPresets, logInfo, log } = require('../utils')

module.exports = async function listHandler() {
  const presets = getPresets()
  logInfo('Stored git user presets: ')
  log(presets.map((v, i) => `${i + 1}) ${v}`).join('\n'))
}
