const fs = require('fs-extra')
const { getPresets, question, SELF_CFG_PATH } = require('../utils')

module.exports = async function deleteHandler() {
  const presets = getPresets()
  const listStr = presets.map((str, i) => `${i + 1}) ${str}`).join('\n')
  const questionStr = `Stored git user presets: \n${listStr}\n\nPlease input index to delete preset (e.g. 1): `
  await question(questionStr, (ans) => {
    const index = Number(ans)
    if (Number.isNaN(index)) {
      console.log(`Invalid input. Please input a number.`)
    } else {
      const deletedPreset = presets.splice(index - 1, 1)[0]
      const newPresets = presets.join('\n')
      console.log(`Delete git user preset: ${deletedPreset}`)
      fs.writeFileSync(SELF_CFG_PATH, newPresets)
    }
  })
}
