const intentController = require('../../libs/intentController');
const boom = require('@hapi/boom');
const config = require('../../config/config');
const request = require('request');
const dialogflow = require('../../libs/dialog_flow');
const { error } = require('../../network/response');

class webhookController {
  constructor() {}

  async process_event(event) {
    // Capturamos los datos del que genera el evento y el mensaje
    const idUser = event.id;
    const senderId = event.sender.id;
    const message = event.message;
    let request_body = {};
    if (message.text) {
      // Enviando el mensaje al dialogflow
      const res = await dialogflow
        .detectIntent(config.PROYECT_ID, senderId, message.text, '', 'es')
        .catch((error) => {
          console.log(error);
        });

      // Aqui editaremos el mensaje de respuesta
      console.log('[ID User]' + idUser);
      console.log(res);
      request_body = await intentController(res, senderId);
      //------------------------------------------------
    } else {
      request_body = {
        recipient: {
          id: senderId,
        },
        message: {
          text: 'Lo siento, no entiendo el tipo de archivo que me has enviado. Envíame solo texto.',
        },
      };
    }
    this.sendMessage(request_body);
  }

  async sendMessage(request_body) {
    request(
      {
        uri: 'https://graph.facebook.com/v14.0/me/messages',
        qs: { access_token: config.KEY_FACEBOOK },
        method: 'POST',
        json: request_body,
      },
      (err, res, body) => {
        if (!err) {
          console.log('Mensaje enviado!');
        } else {
          console.error('No se puedo enviar el mensaje:' + err);
          boom.badImplementation(error);
        }
      }
    );
  }
}

module.exports = webhookController;
