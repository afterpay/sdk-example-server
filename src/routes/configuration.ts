import { Handler } from 'express';
import HttpClient from '../config/HttpClient';
import { locale } from '../config/Region';
import { LOGGER } from '../Logger';

export const get: Handler = async (_req, res) => {
  const configOptions = {
    path: '/v2/configuration',
    headers: {
      'User-Agent': 'Mobile SDK Example Server'
    }
  };

  LOGGER.debug('Configuration request options', configOptions);

  const configRequest = HttpClient.request(configOptions, (configRes) => {
    configRes.on('data', (d) => {
      const responseObject = JSON.parse(d);
      LOGGER.info('Checkout response', responseObject);

      res.json({
        ...responseObject,
        locale
      });
    });
  });

  configRequest.on('error', (e) => {
    LOGGER.error('Configuration request error', e);
  });

  configRequest.end(() => {
    LOGGER.debug('Finished writing configuration request');
  });
};
