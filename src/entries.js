module.exports = [
  {
    flag: 'a',
    fullFlag: 'add',
    desc: 'Add git user preset',
    handler: require('./handlers/add-handler')
  },
  {
    flag: 'c',
    fullFlag: 'current',
    desc: 'Show current git user preset',
    handler: require('./handlers/current-handler')
  },
  {
    flag: 'l',
    fullFlag: 'list',
    desc: 'List all stored user presets',
    handler: require('./handlers/list-handler')
  },
  {
    flag: 'd',
    fullFlag: 'delete',
    desc: 'Delete git user preset',
    handler: require('./handlers/delete-handler')
  },
  {
    flag: 'r',
    fullFlag: 'reset',
    desc: 'Reset gumana',
    handler: require('./handlers/reset-handler')
  }
]
