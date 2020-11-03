#!/usr/bin/env node

;(async function run() {
  await require('./init')()
  require('./worker')()
})()
