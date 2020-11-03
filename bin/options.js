module.exports = [
  {
    flag: 'a',
    fullFlag: 'add',
    desc: 'Add git user info',
    handler: require('./add-handler')
  },
  {
    flag: 'c',
    fullFlag: 'current',
    desc: 'Show current git user info'
  },
  {
    flag: 'l',
    fullFlag: 'list',
    desc: 'List all stored user info'
  },
  {
    flag: 'd',
    fullFlag: 'delete',
    desc: 'Delete git user info'
  },
  {
    flag: 'r',
    fullFlag: 'reset',
    desc: 'Reset git user manager'
  }
]
