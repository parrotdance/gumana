const defaultHandler = require('../src/handlers/default-handler')

module.exports = async function work() {
  const arg = process._cfg.argv
  if (Object.keys(arg).length === 2) {
    // without any flag
    await defaultHandler()
  } else {
    const options = require('./options')
    const option = options.find(
      (option) => arg[option.flag] || arg[option.fullFlag]
    )
    option.handler && (await option.handler())
  }
  process.exit(0)
}
