const defaultHandler = require('../src/handlers/default-handler')
const { logFail } = require('../src/utils')

module.exports = async function work() {
  const arg = process._cfg.argv
  if (Object.keys(arg).length === 2) {
    // without any flag
    await defaultHandler()
  } else {
    const options = require('../src/entries')
    const option = options.find(
      (option) => arg[option.flag] || arg[option.fullFlag]
    )
    if (option) {
      option.handler && (await option.handler())
    } else {
      const restFlag = Object.keys(arg)
        .filter((k) => k !== '_' && k !== '$0')
        .map((k) => (k.length > 1 ? `--${k}` : `-${k}`))
        .join(', ')
      logFail(
        `Undefined option: ${restFlag}\n\nPlease run 'gumana -h' to check available options.`
      )
    }
  }
  process.exit(0)
}
