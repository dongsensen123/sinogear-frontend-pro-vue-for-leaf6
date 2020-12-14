const chalk = require('chalk');
const { version } = require('./package.json');

const printLOGO = () => {
  console.log(
    chalk.blue('' + '--╔═╗╦╔╗╔╔═╗╔═╗╔═╗╔═╗╦═╗  ╔═╗╦═╗╔═╗╔╗╔╔╦╗╔═╗╔╗╔╔╦╗\n') +
    chalk.blue('' + '--╚═╗║║║║║ ║║ ╦║╣ ╠═╣╠╦╝  ╠╣ ╠╦╝║ ║║║║ ║ ║╣ ║║║ ║║\n') +
    chalk.blue('' + '--╚═╝╩╝╚╝╚═╝╚═╝╚═╝╩ ╩╩╚═  ╚  ╩╚═╚═╝╝╚╝ ╩ ╚═╝╝╚╝═╩╝') + chalk.yellow('  ' + 'FOR VUE' + '@' + version)
  )
};

printLOGO();