/**
 * email hook
 *
 * @description :: A hook definition.  Extends Sails by adding shadow routes, implicit actions, and/or initialization logic.
 * @docs        :: https://sailsjs.com/docs/concepts/extending-sails/hooks
 */

const nodemailer = require('nodemailer');
const axios = require('axios');

module.exports = function defineEmailHook(sails) {
  let transporter;
  return {
    /**
     * Runs when this Sails app loads/lifts.
     */
    initialize: async function () {
      const { SEND_IN_BLUE } = sails.config.custom;

      const {
        SEND_IN_BLUE_MASTER_PASSWORD,
        SEND_IN_BLUE_MASTER_EMAIL,
        SEND_IN_BLUE_SMTP_SERVER_HOST,
        SEND_IN_BLUE_SMTP_SERVER_PORT
      } = SEND_IN_BLUE;
      const emailConfig = {
        host: SEND_IN_BLUE_SMTP_SERVER_HOST,
        port: SEND_IN_BLUE_SMTP_SERVER_PORT,
        auth: {
          user: SEND_IN_BLUE_MASTER_EMAIL,
          pass: SEND_IN_BLUE_MASTER_PASSWORD,
        },
      }
      transporter = nodemailer.createTransport(emailConfig);
    },
    sendMail: async (from, to, subject, html) => {
      let info = await transporter.sendMail({
        from,
        to,
        subject,
        html,
        text: 'Please confirm your email before proceeding to One App'
      });
      console.log({ info });
    },
    sendMailViaApi: async (from, to, subject, html) => {
      const url = 'https://api.sendinblue.com/v3/smtp/email'
      const method = 'POST'
      const headers = {
        'accept': 'application/json',
        'api-key': process.env.SEND_IN_BLUE_API_KEY,
        'content-type': 'application/json'
      }
      const data = {
        sender: {
          name: 'Anirudha Gandhare',
          email: from
        },
        to: [
          { email: to }
        ],
        subject,
        htmlContent: html
      };
      const response = await axios(url, {
        method,
        headers,
        data
      });
      console.log({ response });
    }
  };

};
