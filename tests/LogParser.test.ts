const assert = require('assert');

const { LogParser, LogLevel } = require('../LogParser');

describe('Log Parser methods', () => {
    it('Error reading file', () => {
        const logParser = new LogParser('app.logs', 'errors.json');
        const inputFile = logParser.getFileFromPath();
        assert.equal(inputFile, null);
    });

    it('Successfully reading file', () => {
        const logParser = new LogParser('app.log', 'errors.json');
        const inputFile = logParser.getFileFromPath();
        assert.notEqual(inputFile, null);
    });

    it('Get wrong log level', () => {
        const logParser = new LogParser('app.log', 'errors.json');
        const log = '2021-08-09T02:12:51.265Z - trace - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e821","details":"Service is successfully finished"}';
        const logLevel = logParser.getLogLevel(log);
        assert.equal(Object.keys(LogLevel).includes(logLevel), false);
    });

    it('Get error log level', () => {
        const logParser = new LogParser('app.log', 'errors.json');
        const log = '2021-08-09T02:12:51.265Z - error - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e821","details":"Service is successfully finished"}';
        const logLevel = logParser.getLogLevel(log);
        assert.equal(logLevel, LogLevel.error);
    });
});