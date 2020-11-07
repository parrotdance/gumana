const fs = require('fs-extra')
const { question, SELF_CFG_PATH, logWarn, logSucceed } = require('../utils')

module.exports = async function resetHandler() {
  const exist = fs.existsSync(SELF_CFG_PATH)
  if (exist) {
    const warning = `Reset gumana will delete file: ${SELF_CFG_PATH}.\n  Which will lose *ALL OF* git user presets.`
    logWarn(warning)
    await question(`Are you sure? (y/n) `, (ans) => {
      if (ans === 'y') {
        try {
          fs.unlinkSync(SELF_CFG_PATH)
          logSucceed(`File has been deleted: ${SELF_CFG_PATH}`)
        } catch (e) {
          console.error(e)
        }
      } else {
        console.log(`Negative. Process exit.`)
      }
    })
  }
}
