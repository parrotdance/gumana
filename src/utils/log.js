const ora = require('ora')()

const log = console.log
const logSucceed = (text) => ora.succeed(text)
const logFail = (text) => ora.fail(text)
const logWarn = (text) => ora.warn(text)
const logInfo = (text) => ora.info(text)

module.exports = { log, logSucceed, logFail, logWarn, logInfo }
