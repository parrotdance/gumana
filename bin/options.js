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
    desc: '(WIP) Show current git user info'
  },
  {
    flag: 'l',
    fullFlag: 'list',
    desc: 'List all stored user info',
    handler: require('../src/handlers/list-handler')
  },
  {
    flag: 'd',
    fullFlag: 'delete',
    desc: '(WIP) Delete git user info'
  },
  {
    flag: 'r',
    fullFlag: 'reset',
    desc: '(WIP) Reset git user manager'
  }
]
