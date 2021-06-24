const { getPresets } = require('../utils')
const { logInfo, log } = require('../utils/log')

module.exports = async function listHandler() {
  const presets = getPresets()
  logInfo('Stored git user presets: ')
  log(presets.map((v, i) => `${i + 1}) ${v}`).join('\n'))
}
