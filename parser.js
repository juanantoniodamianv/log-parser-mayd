const { LogParser } = require('./LogParser');
const argv = require('minimist')(process.argv.slice(2));
const logParser = new LogParser(argv.input, argv.output);

logParser.init();