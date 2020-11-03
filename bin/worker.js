const options = require('./options')

module.exports = async function work() {
  const arg = process._cfg.argv
  options.forEach((option) => {
    const { flag, fullFlag, handler } = option
    if (arg[flag] || arg[fullFlag]) {
      if (handler) await handler()
      process.exit(0) // only execute first matched handler
    }
  })
  console.log(arg)
}
