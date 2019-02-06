let colors = require('colors');


module.exports = {
    'restart': function () {
        process.stdout.write('\x1Bc');
        console.log('Server Restarted'.green)

    },
    'start': function () {
        console.log('Server Started'.blue)
    }
}