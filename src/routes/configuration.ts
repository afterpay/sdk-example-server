import { Handler } from 'express';
import HttpClient from '../config/HttpClient';
import { locale } from '../config/Region';

export const get: Handler = async (_req, res) => {
  const configRequest = HttpClient.request({
    path: '/v2/configuration',
    headers: {
      'User-Agent': 'Mobile SDK Example Server'
    }
  }, (configRes) => {
    configRes.on('data', (d) => {
      const responseObject = JSON.parse(d);
      res.json({
        ...responseObject,
        locale,
      });
    });
  });

  configRequest.on('error', (e) => {
    console.log(e);
  });

  configRequest.end();
}
