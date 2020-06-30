import { Handler } from 'express';
import { request, RequestOptions } from 'https';

export function configuration(options: RequestOptions): Handler {
  return (req, res) => {
    const configOptions = {
      ...options,
      path: '/v2/configuration'
    };

    const configRequest = request(configOptions, (configRes) => {
      configRes.on('data', (d) => {
        res.json(JSON.parse(d));
      });
    });

    configRequest.on('error', (e) => {
      console.log(e);
    });

    configRequest.end();
  };
}
