const { getPresets } = require('../utils')

module.exports = async function listHandler() {
  const presets = getPresets()
  console.log(presets.join('\n'))
}
