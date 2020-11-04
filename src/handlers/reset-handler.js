const fs = require('fs-extra')
const { question, SELF_CFG_PATH } = require('../utils')

module.exports = async function resetHandler() {
  const exist = fs.existsSync(SELF_CFG_PATH)
  if (exist) {
    const questStr = `Reset gumana will delete file: ${SELF_CFG_PATH}.\nWhich will lose *ALL OF* git user presets. Are you sure? (y/n)`
    await question(questStr, (ans) => {
      if (ans === 'y') {
        try {
          fs.unlinkSync(SELF_CFG_PATH)
          console.log(`File has been deleted: ${SELF_CFG_PATH}`)
        } catch (e) {
          console.error(e)
        }
      } else {
        console.log(`Negative. Process exit.`)
      }
    })
  }
}
