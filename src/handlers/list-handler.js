const { PRESETS } = require('../utils')

module.exports = async function listHandler() {
  console.log(PRESETS.join('\n'))
}
