import { Handler } from 'express';
import { request, RequestOptions } from 'https';
import { Locale } from '../Region';

export function configuration(locale: Locale, options: RequestOptions): Handler {
  return (req, res) => {
    const configOptions = {
      ...options,
      path: '/v2/configuration',
      headers: {
        'User-Agent': 'Mobile SDK Example Server'
      }
    };

    const configRequest = request(configOptions, (configRes) => {
      configRes.on('data', (d) => {
        const responseObject = JSON.parse(d);
        res.json({
          ...responseObject,
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
