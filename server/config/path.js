const path = require('path');
const sails = require('sails');

module.exports.paths = {
    templates: path.join(sails.config.paths.public, 'templates')
}