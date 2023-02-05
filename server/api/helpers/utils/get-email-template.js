const path = require('path');
const ejs = require('ejs');
module.exports = {
  inputs: {
    templateName: {
      type: 'string'
    },
    templateData: {
      type: 'json'
    }
  },
  exits: {
    success: {
    },
  },
  fn: async function (inputs) {
    const { templateName, templateData } = inputs;
    const publicPath = sails.config.paths.public;
    const templatesPath = path.join(publicPath, 'templates', templateName, 'index.ejs');
    const template = await ejs.renderFile(templatesPath, templateData)
    return template;
  }
};  