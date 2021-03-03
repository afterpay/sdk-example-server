import { Handler } from 'express';
import { request, RequestOptions } from 'https';

export function configuration(locale: string, options: RequestOptions): Handler {
  return (req, res) => {
    const configOptions = {
      ...options,
      path: '/v2/configuration'
    };

    const configRequest = request(configOptions, (configRes) => {
      configRes.on('data', (d) => {
        const responseObject = JSON.parse(d);
        res.json({
          minimumAmount: responseObject.minimumAmount,
          maximumAmount: responseObject.maximumAmount,
          locale: locale
        });
      });
    });

    configRequest.on('error', (e) => {
      console.log(e);
    });

    configRequest.end();
  };
}
