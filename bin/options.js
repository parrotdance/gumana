module.exports = [
  {
    flag: 'a',
    fullFlag: 'add',
    desc: 'Add git user info',
    handler: require('../src/handlers/add-handler')
  },
  {
    flag: 'c',
    fullFlag: 'current',
    desc: 'Show current git user info',
    handler: require('../src/handlers/current-handler')
  },
  {
    flag: 'l',
    fullFlag: 'list',
    desc: 'List all stored user presets',
    handler: require('../src/handlers/list-handler')
  },
  {
    flag: 'd',
    fullFlag: 'delete',
    desc: 'Delete git user preset',
    handler: require('../src/handlers/delete-handler')
  },
  {
    flag: 'r',
    fullFlag: 'reset',
    desc: 'Reset git user manager',
    handler: require('../src/handlers/reset-handler')
  }
]
